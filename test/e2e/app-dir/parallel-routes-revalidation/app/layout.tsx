import React from 'react'

export default function Root({
  children,
  dialog,
}: {
  children: React.ReactNode
  dialog: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        {dialog}
      </body>
    </html>
  )
}
