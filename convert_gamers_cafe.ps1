Add-Type -AssemblyName System.Drawing

# Create 512x512 High-Res Master Logo
$masterSize = 512
$bmp = New-Object System.Drawing.Bitmap($masterSize, $masterSize)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.Clear([System.Drawing.Color]::Transparent)

$cx = 256
$cy = 256
$r = 236

# Outer Glow Ring
$glowPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 16, 185, 129), 10)
$g.DrawEllipse($glowPen, $cx - $r, $cy - $r, $r * 2, $r * 2)

# Inner Obsidian Circle Fill
$rect = New-Object System.Drawing.Rectangle(($cx - $r + 5), ($cy - $r + 5), (($r - 5) * 2), (($r - 5) * 2))
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse($rect)
$pbr = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
$pbr.CenterColor = [System.Drawing.Color]::FromArgb(255, 22, 28, 42)
$pbr.SurroundColors = @([System.Drawing.Color]::FromArgb(255, 10, 13, 20))
$g.FillPath($pbr, $path)

# Cyan/Emerald Inner Border
$borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 6, 182, 212), 4)
$g.DrawEllipse($borderPen, $cx - $r + 10, $cy - $r + 10, ($r - 10) * 2, ($r - 10) * 2)

# Draw Crown at top
$crownBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 245, 158, 11))
$crownPoints = @(
    (New-Object System.Drawing.PointF(236, 68)),
    (New-Object System.Drawing.PointF(244, 84)),
    (New-Object System.Drawing.PointF(256, 60)),
    (New-Object System.Drawing.PointF(268, 84)),
    (New-Object System.Drawing.PointF(276, 68)),
    (New-Object System.Drawing.PointF(270, 96)),
    (New-Object System.Drawing.PointF(242, 96))
)
$g.FillPolygon($crownBrush, $crownPoints)

# Draw Coffee Steam (Cyan/Emerald Waves)
$steamPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(230, 16, 185, 129), 6)
$g.DrawArc($steamPen, 220, 110, 30, 40, -90, 180)
$g.DrawArc($steamPen, 220, 140, 30, 40, 90, -180)

$steamPen2 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(230, 6, 182, 212), 6)
$g.DrawArc($steamPen2, 250, 105, 30, 45, -90, 180)
$g.DrawArc($steamPen2, 250, 140, 30, 45, 90, -180)

$g.DrawArc($steamPen, 275, 115, 25, 35, -90, 180)
$g.DrawArc($steamPen, 275, 140, 25, 35, 90, -180)

# Draw Coffee Cup Base
$cupBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 26, 34, 52))
$cupPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 16, 185, 129), 5)
$g.FillRectangle($cupBrush, 196, 180, 120, 110)
$g.DrawRectangle($cupPen, 196, 180, 120, 110)

# Coffee Cup Handle
$g.DrawArc($cupPen, 290, 200, 50, 60, -90, 180)

# Draw Gamepad / Controller over the Cup
$padBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 23, 38))
$padPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 6, 182, 212), 5)

$padPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$padPath.AddArc(170, 230, 60, 60, 90, 180)
$padPath.AddLine(200, 230, 312, 230)
$padPath.AddArc(282, 230, 60, 60, -90, 180)
$padPath.AddLine(312, 290, 200, 290)
$padPath.CloseFigure()
$g.FillPath($padBrush, $padPath)
$g.DrawPath($padPen, $padPath)

# D-PAD (Left)
$dpadBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 245, 158, 11))
$g.FillRectangle($dpadBrush, 202, 252, 24, 8)
$g.FillRectangle($dpadBrush, 210, 244, 8, 24)

# Action Buttons (Right)
$btnA = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
$btnB = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 239, 68, 68))
$btnX = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 59, 130, 246))
$btnY = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 245, 158, 11))

$g.FillEllipse($btnA, 296, 264, 10, 10) # A
$g.FillEllipse($btnB, 306, 254, 10, 10) # B
$g.FillEllipse($btnX, 286, 254, 10, 10) # X
$g.FillEllipse($btnY, 296, 244, 10, 10) # Y

# Thumbsticks
$stickBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 41, 59))
$stickPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 148, 163, 184), 2)
$g.FillEllipse($stickBrush, 236, 260, 18, 18)
$g.DrawEllipse($stickPen, 236, 260, 18, 18)
$g.FillEllipse($stickBrush, 260, 260, 18, 18)
$g.DrawEllipse($stickPen, 260, 260, 18, 18)

# GAMER'S CAFE Text Banner at bottom
$font = New-Object System.Drawing.Font("Arial", 28, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font("Arial", 22, [System.Drawing.FontStyle]::Bold)

$textWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$textCyan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))

$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center

$g.DrawString("GAMER'S", $font, $textWhite, 256, 360, $sf)
$g.DrawString("CAFE", $fontSub, $textCyan, 256, 402, $sf)

$g.Dispose()

# Save PNG master
$bmp.Save("public/gamezync-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("public/favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("public/icon-192.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("public/icon-512.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("public/apple-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("public/apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("src/app/apple-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("src/app/icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Create 32x32 Favicon ICO
$icoBmp = New-Object System.Drawing.Bitmap($bmp, 32, 32)
$hIcon = $icoBmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fs = New-Object System.IO.FileStream("public/favicon.ico", [System.IO.FileMode]::Create)
$icon.Save($fs)
$fs.Close()
$icoBmp.Dispose()

# Also copy to src/app/favicon.ico
Copy-Item "public/favicon.ico" -Destination "src/app/favicon.ico" -Force

# Create 1200x630 OpenGraph Banner (og-image.jpg)
$ogW = 1200
$ogH = 630
$ogBmp = New-Object System.Drawing.Bitmap($ogW, $ogH)
$ogG = [System.Drawing.Graphics]::FromImage($ogBmp)
$ogG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ogG.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$ogG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Dark Cyber Gradient Background
$ogRect = New-Object System.Drawing.Rectangle(0, 0, $ogW, $ogH)
$ogGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($ogRect, [System.Drawing.Color]::FromArgb(255, 10, 13, 20), [System.Drawing.Color]::FromArgb(255, 20, 26, 40), 45)
$ogG.FillRectangle($ogGrad, $ogRect)

# Subtle Matrix Grid lines
$gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(30, 16, 185, 129), 1)
for ($x = 0; $x -lt $ogW; $x += 40) {
    $ogG.DrawLine($gridPen, $x, 0, $x, $ogH)
}
for ($y = 0; $y -lt $ogH; $y += 40) {
    $ogG.DrawLine($gridPen, 0, $y, $ogW, $y)
}

# Draw 420x420 Master Logo on Left
$logoDestRect = New-Object System.Drawing.Rectangle(70, 105, 420, 420)
$ogG.DrawImage($bmp, $logoDestRect)

# Draw Title and Subtitle on Right
$fTitle = New-Object System.Drawing.Font("Arial", 54, [System.Drawing.FontStyle]::Bold)
$fSub = New-Object System.Drawing.Font("Arial", 22, [System.Drawing.FontStyle]::Bold)
$fDesc = New-Object System.Drawing.Font("Arial", 16, [System.Drawing.FontStyle]::Regular)

$bWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$bCyan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 185, 129))
$bMuted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))

$ogG.DrawString("GAMER'S CAFE", $fTitle, $bWhite, 530, 160)
$ogG.DrawString("ULTIMATE PC GAMING PLATFORM", $fSub, $bCyan, 532, 235)

$ogG.DrawString("• Direct 1-Click Fast PC Downloads", $fDesc, $bMuted, 532, 300)
$ogG.DrawString("• Instant Browser Play (Zero Install)", $fDesc, $bMuted, 532, 335)
$ogG.DrawString("• Smart System Specs Hardware Matcher", $fDesc, $bMuted, 532, 370)

# Feature Badges
$badgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 16, 185, 129), 2)
$badgeBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(100, 16, 185, 129))

$ogG.FillRectangle($badgeBg, 532, 430, 180, 45)
$ogG.DrawRectangle($badgePen, 532, 430, 180, 45)
$ogG.DrawString("🎮 PC Games", $fDesc, $bWhite, 550, 440)

$ogG.FillRectangle($badgeBg, 732, 430, 180, 45)
$ogG.DrawRectangle($badgePen, 732, 430, 180, 45)
$ogG.DrawString("⚡ Instant Play", $fDesc, $bWhite, 745, 440)

$ogG.FillRectangle($badgeBg, 932, 430, 180, 45)
$ogG.DrawRectangle($badgePen, 932, 430, 180, 45)
$ogG.DrawString("🖥️ Specs Match", $fDesc, $bWhite, 942, 440)

$ogG.Dispose()

# Save JPEG og-image.jpg
$ogBmp.Save("public/og-image.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$ogBmp.Save("public/opengraph-image.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$ogBmp.Save("public/twitter-image.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)

$ogBmp.Save("src/app/og-image.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$ogBmp.Save("src/app/opengraph-image.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$ogBmp.Save("src/app/twitter-image.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)

$ogBmp.Dispose()
$bmp.Dispose()

Write-Host "Gamer's Cafe Logo & OpenGraph Banner Generated Successfully!"
