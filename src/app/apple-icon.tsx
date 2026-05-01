import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 110,
          fontWeight: 800,
          fontFamily: 'sans-serif',
          letterSpacing: '-2px',
          paddingLeft: '10px',
        }}
      >
        BE
        <span style={{ color: '#0ea5e9' }}>.</span>
      </div>
    ),
    { ...size }
  )
}
