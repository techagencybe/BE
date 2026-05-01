import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
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
          fontSize: 20,
          fontWeight: 800,
          fontFamily: 'sans-serif',
          letterSpacing: '-0.5px',
          paddingLeft: '2px', // Slight adjustment for optical centering
        }}
      >
        BE
        <span style={{ color: '#0ea5e9' }}>.</span>
      </div>
    ),
    { ...size }
  )
}
