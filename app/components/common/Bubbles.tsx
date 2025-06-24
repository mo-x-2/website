'use client'

import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

type Props = {
  sectionId?: string;
  bubbleCount?: number;
  backgroundColor?: string;
  strokeStyle?: string;
}

interface Ball {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
}

export default function Bubbles({ 
  sectionId = 'bubblesSection',
  bubbleCount = 5,
  backgroundColor = 'rgba(255, 255, 255, 0.5)',
  strokeStyle = 'rgba(0, 0, 0, 0.5)',
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const ballsRef = useRef<Ball[]>([]);
  const resolutionRef = useRef(10);
  const thresholdRef = useRef(1.0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Intersection Observer で可視性を監視
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById(sectionId);
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [sectionId]);

  // キャンバスをリサイズする
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        if (container) {
          // キャンバスのサイズを親要素に合わせる
          const { width, height } = container.getBoundingClientRect();
          canvas.width = width;
          canvas.height = height;
          dimensionsRef.current = { width, height };
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 初期サイズ設定

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ダークモードの変更を監視
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // バブルの初期化と更新
  useEffect(() => {
    if (!isVisible) return;

    const initBalls = () => {
      const { width, height } = dimensionsRef.current;
      const balls: Ball[] = [];
      for (let i = 0; i < bubbleCount; i++) {
        balls.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 50 + 150, // サイズのランダム化
          vx: Math.random() * 2.5 - 1.25,
          vy: Math.random() * 2.5 - 1.25
        });
      }
      ballsRef.current = balls;
    };

    initBalls();
    
    // アニメーションフレーム
    const animate = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // 背景をクリア（透明に）
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // ダークモードかどうかを判定
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // 輪郭線の描画
      let strokeColor = strokeStyle;
      if (isDarkMode) {
        strokeColor = 'rgba(255, 255, 255, 0.5)';
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      
      const { width, height } = dimensionsRef.current;
      const resolution = resolutionRef.current;
      const threshold = thresholdRef.current;
      const balls = ballsRef.current;
      
      // ボールの位置更新
      balls.forEach(ball => {
        ball.x += ball.vx;
        ball.y += ball.vy;
        
        if (ball.x < ball.r || ball.x > width - ball.r) {
          ball.vx *= -1;
          ball.x = Math.max(ball.r, Math.min(width - ball.r, ball.x));
        }
        
        if (ball.y < ball.r || ball.y > height - ball.r) {
          ball.vy *= -1;
          ball.y = Math.max(ball.r, Math.min(height - ball.r, ball.y));
        }
      });
      
      // Marching Squares の実装
      const cols = Math.floor(width / resolution) + 1;
      const rows = Math.floor(height / resolution) + 1;
      
      // フィールド値の計算
      const field: number[][] = [];
      for (let i = 0; i < cols; i++) {
        field[i] = [];
        for (let j = 0; j < rows; j++) {
          const x = i * resolution;
          const y = j * resolution;
          let sum = 0;
          
          for (const ball of balls) {
            const d = Math.sqrt((x - ball.x) ** 2 + (y - ball.y) ** 2);
            sum += (ball.r * ball.r) / (d * d + 1);
          }
          
          field[i][j] = sum;
        }
      }
      
      // 各セルの状態に応じて輪郭線を描画
      for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1; j++) {
          const x = i * resolution;
          const y = j * resolution;
          
          const a = field[i][j] > threshold ? 1 : 0;
          const b = field[i+1][j] > threshold ? 1 : 0;
          const c = field[i+1][j+1] > threshold ? 1 : 0;
          const d = field[i][j+1] > threshold ? 1 : 0;
          
          const state = a + b * 2 + c * 4 + d * 8;
          
          // 線を描画する補助関数
          const interp = (x1: number, y1: number, x2: number, y2: number, v1: number, v2: number) => {
            const t = (threshold - v1) / (v2 - v1);
            return {
              x: x1 + t * (x2 - x1),
              y: y1 + t * (y2 - y1)
            };
          };
          
          const drawLine = (x1: number, y1: number, x2: number, y2: number, v1: number, v2: number, 
                            x3: number, y3: number, x4: number, y4: number, v3: number, v4: number) => {
            const p1 = interp(x1, y1, x2, y2, v1, v2);
            const p2 = interp(x3, y3, x4, y4, v3, v4);
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          };
          
          // 各セルの状態に応じて輪郭線を描画
          switch (state) {
            case 1: case 14:
              drawLine(x, y, x, y+resolution, field[i][j], field[i][j+1],
                      x, y, x+resolution, y, field[i][j], field[i+1][j]);
              break;
            case 2: case 13:
              drawLine(x+resolution, y, x, y, field[i+1][j], field[i][j],
                      x+resolution, y, x+resolution, y+resolution, field[i+1][j], field[i+1][j+1]);
              break;
            case 3: case 12:
              drawLine(x, y, x, y+resolution, field[i][j], field[i][j+1],
                      x+resolution, y, x+resolution, y+resolution, field[i+1][j], field[i+1][j+1]);
              break;
            case 4: case 11:
              drawLine(x+resolution, y+resolution, x+resolution, y, field[i+1][j+1], field[i+1][j],
                      x, y+resolution, x+resolution, y+resolution, field[i][j+1], field[i+1][j+1]);
              break;
            case 5:
              drawLine(x, y, x, y+resolution, field[i][j], field[i][j+1],
                      x, y, x+resolution, y, field[i][j], field[i+1][j]);
              drawLine(x+resolution, y+resolution, x+resolution, y, field[i+1][j+1], field[i+1][j],
                      x, y+resolution, x+resolution, y+resolution, field[i][j+1], field[i+1][j+1]);
              break;
            case 6: case 9:
              drawLine(x, y, x+resolution, y, field[i][j], field[i+1][j],
                      x, y+resolution, x+resolution, y+resolution, field[i][j+1], field[i+1][j+1]);
              break;
            case 7: case 8:
              drawLine(x, y, x, y+resolution, field[i][j], field[i][j+1],
                      x, y+resolution, x+resolution, y+resolution, field[i][j+1], field[i+1][j+1]);
              break;
            case 10:
              drawLine(x, y, x+resolution, y, field[i][j], field[i+1][j],
                      x+resolution, y, x+resolution, y+resolution, field[i+1][j], field[i+1][j+1]);
              drawLine(x, y+resolution, x, y, field[i][j+1], field[i][j],
                      x, y+resolution, x+resolution, y+resolution, field[i][j+1], field[i+1][j+1]);
              break;
          }
        }
      }
      
    ctx.save();
    ctx.stroke();
    ctx.restore();
      
      // フレームを継続
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    // クリーンアップ
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isVisible, bubbleCount, backgroundColor, isDarkMode]);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out',
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', background: 'transparent' }} />
    </Box>
  );
}