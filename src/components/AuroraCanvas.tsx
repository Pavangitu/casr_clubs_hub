import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types';

interface AuroraCanvasProps {
  theme: ThemeMode;
}

export const AuroraCanvas: React.FC<AuroraCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_isDark;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = v_texCoord;
        float t = u_time * 0.2;
        
        vec3 col1 = vec3(0.145, 0.388, 0.922); // Royal Blue #2563EB
        vec3 col2 = vec3(0.063, 0.725, 0.506); // Emerald Green #10B981
        vec3 col3 = vec3(0.58, 0.2, 0.827);    // Violet

        float wave1 = sin(uv.x * 3.0 + t) * 0.5 + 0.5;
        float wave2 = cos(uv.y * 2.0 - t * 1.5) * 0.5 + 0.5;

        vec3 finalColor = mix(col1, col2, wave1);
        finalColor = mix(finalColor, col3, wave2 * 0.4);

        float dist = distance(uv, vec2(0.5));

        if (u_isDark > 0.5) {
          // Dark Mode Shader
          float sparkle = pow(noise(uv + t), 20.0);
          finalColor += sparkle * 0.08;
          finalColor *= (0.2 + 0.8 * (1.0 - dist * 0.7));
          gl_FragColor = vec4(finalColor * 0.4 + 0.03, 1.0);
        } else {
          // Light Mode Shader
          finalColor *= (1.0 - dist * 0.5);
          gl_FragColor = vec4(finalColor * 0.12 + 0.95, 1.0);
        }
      }
    `;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uIsDark = gl.getUniformLocation(program, 'u_isDark');

    const syncSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    syncSize();
    window.addEventListener('resize', syncSize);

    const render = (time: number) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);

      if (uTime) gl.uniform1f(uTime, time * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uIsDark) gl.uniform1f(uIsDark, theme === 'dark' ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener('resize', syncSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-700">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
