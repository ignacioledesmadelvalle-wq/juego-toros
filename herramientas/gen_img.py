import os, random, cairosvg

OUT = "assets/img"
os.makedirs(OUT, exist_ok=True)
K = 'stroke="#2b1d14" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"'
K4 = 'stroke="#2b1d14" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"'

def save(name, body, w=256, h=256, scale=2):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{body}</svg>'
    cairosvg.svg2png(bytestring=svg.encode(), write_to=f"{OUT}/{name}.png",
                     output_width=w*scale, output_height=h*scale)

# ---------- personajes (miran hacia abajo) ----------
def farmer(shirt, shirt_dark, girl):
    braids = ""
    if girl:
        braids = f'''
        <path d="M88 118 Q70 150 80 178" fill="none" stroke="#2b1d14" stroke-width="20" stroke-linecap="round"/>
        <path d="M88 118 Q70 150 80 178" fill="none" stroke="#e0a030" stroke-width="12" stroke-linecap="round"/>
        <path d="M168 118 Q186 150 176 178" fill="none" stroke="#2b1d14" stroke-width="20" stroke-linecap="round"/>
        <path d="M168 118 Q186 150 176 178" fill="none" stroke="#e0a030" stroke-width="12" stroke-linecap="round"/>
        <circle cx="80" cy="180" r="8" fill="#e84a6a" {K4}/>
        <circle cx="176" cy="180" r="8" fill="#e84a6a" {K4}/>'''
    lashes = ""
    if girl:
        lashes = '<path d="M103 118 l-6 -5 M153 118 l6 -5" stroke="#2b1d14" stroke-width="3"/>'
    return f'''
    <ellipse cx="128" cy="238" rx="54" ry="10" fill="#000" opacity="0.15"/>
    <rect x="98" y="196" width="24" height="36" rx="8" fill="#6b4226" {K}/>
    <rect x="134" y="196" width="24" height="36" rx="8" fill="#6b4226" {K}/>
    <path d="M72 160 Q60 190 70 205" fill="none" stroke="#2b1d14" stroke-width="26" stroke-linecap="round"/>
    <path d="M72 160 Q60 190 70 205" fill="none" stroke="{shirt}" stroke-width="16" stroke-linecap="round"/>
    <path d="M184 160 Q196 190 186 205" fill="none" stroke="#2b1d14" stroke-width="26" stroke-linecap="round"/>
    <path d="M184 160 Q196 190 186 205" fill="none" stroke="{shirt}" stroke-width="16" stroke-linecap="round"/>
    <circle cx="70" cy="208" r="10" fill="#f5c79e" {K4}/>
    <circle cx="186" cy="208" r="10" fill="#f5c79e" {K4}/>
    <rect x="80" y="146" width="96" height="68" rx="24" fill="{shirt}" {K}/>
    <path d="M100 150 v60 M128 150 v60 M156 150 v60 M84 170 h88 M84 192 h88" stroke="{shirt_dark}" stroke-width="4" opacity="0.7"/>
    <path d="M94 176 h68 v26 q0 12 -12 12 h-44 q-12 0 -12 -12z" fill="#3a6fd8" {K}/>
    <path d="M100 176 L96 150 M156 176 L160 150" stroke="#3a6fd8" stroke-width="8"/>
    <circle cx="112" cy="182" r="4" fill="#ffd34d"/><circle cx="144" cy="182" r="4" fill="#ffd34d"/>
    {braids}
    <circle cx="128" cy="112" r="44" fill="#f5c79e" {K}/>
    <circle cx="108" cy="122" r="7" fill="#2b1d14"/><circle cx="148" cy="122" r="7" fill="#2b1d14"/>
    <circle cx="110" cy="120" r="2.5" fill="#fff"/><circle cx="150" cy="120" r="2.5" fill="#fff"/>
    {lashes}
    <circle cx="96" cy="138" r="7" fill="#ff8a8a" opacity="0.6"/><circle cx="160" cy="138" r="7" fill="#ff8a8a" opacity="0.6"/>
    <path d="M114 140 Q128 152 142 140" fill="none" stroke="#2b1d14" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="128" cy="70" rx="82" ry="28" fill="#f2cf5b" {K}/>
    <path d="M62 68 Q128 88 194 68" fill="none" stroke="#c9a23a" stroke-width="4"/>
    <ellipse cx="128" cy="56" rx="42" ry="24" fill="#f7da6e" {K}/>
    <path d="M88 64 Q128 78 168 64" fill="none" stroke="#e24a3b" stroke-width="10"/>
    '''
save("granjero", farmer("#e24a3b", "#9e2a20", False))
save("granjera", farmer("#3fb35a", "#1f7a36", True))

# ---------- toros (miran hacia abajo) ----------
BULL, BULL_D = "#7a4a2a", "#5a331c"
def horns(y, spread=1.0):
    s = spread
    return f'''
    <path d="M{128-34*s} {y} Q{128-70*s} {y-6} {128-74*s} {y-34}" fill="none" stroke="#2b1d14" stroke-width="20" stroke-linecap="round"/>
    <path d="M{128-34*s} {y} Q{128-70*s} {y-6} {128-74*s} {y-34}" fill="none" stroke="#fff6e0" stroke-width="12" stroke-linecap="round"/>
    <path d="M{128+34*s} {y} Q{128+70*s} {y-6} {128+74*s} {y-34}" fill="none" stroke="#2b1d14" stroke-width="20" stroke-linecap="round"/>
    <path d="M{128+34*s} {y} Q{128+70*s} {y-6} {128+74*s} {y-34}" fill="none" stroke="#fff6e0" stroke-width="12" stroke-linecap="round"/>'''

def bull_head(cy, eyes, brows="", mouth=""):
    return f'''
    <ellipse cx="{128-46}" cy="{cy-18}" rx="18" ry="10" fill="{BULL}" {K} transform="rotate(-20 {128-46} {cy-18})"/>
    <ellipse cx="{128+46}" cy="{cy-18}" rx="18" ry="10" fill="{BULL}" {K} transform="rotate(20 {128+46} {cy-18})"/>
    {horns(cy-26)}
    <ellipse cx="128" cy="{cy}" rx="42" ry="40" fill="{BULL}" {K}/>
    <path d="M114 {cy-36} q14 -10 28 0 q-14 10 -28 0z" fill="#3a2010"/>
    {eyes}{brows}
    <ellipse cx="128" cy="{cy+24}" rx="30" ry="20" fill="#f0a8a0" {K}/>
    <ellipse cx="118" cy="{cy+24}" rx="5" ry="7" fill="#2b1d14"/><ellipse cx="138" cy="{cy+24}" rx="5" ry="7" fill="#2b1d14"/>
    <circle cx="128" cy="{cy+44}" r="9" fill="none" stroke="#ffd34d" stroke-width="5"/>
    {mouth}'''

sleep_eyes = '<path d="M100 150 q10 8 20 0 M136 150 q10 8 20 0" fill="none" stroke="#2b1d14" stroke-width="5" stroke-linecap="round"/>'
save("toro-dormido", f'''
    <ellipse cx="128" cy="232" rx="90" ry="14" fill="#000" opacity="0.15"/>
    <path d="M128 70 Q180 40 200 60" fill="none" stroke="#2b1d14" stroke-width="10" stroke-linecap="round"/>
    <path d="M200 60 l10 -6 l-2 12z" fill="#2b1d14"/>
    <ellipse cx="128" cy="120" rx="92" ry="76" fill="{BULL}" {K}/>
    <ellipse cx="96" cy="100" rx="26" ry="18" fill="{BULL_D}"/>
    <ellipse cx="164" cy="130" rx="20" ry="14" fill="{BULL_D}"/>
    <ellipse cx="46" cy="186" rx="22" ry="12" fill="{BULL}" {K}/>
    <ellipse cx="210" cy="186" rx="22" ry="12" fill="{BULL}" {K}/>
    {bull_head(166, sleep_eyes)}
''')

open_eyes = '''<circle cx="110" cy="150" r="10" fill="#fff" stroke="#2b1d14" stroke-width="4"/>
<circle cx="146" cy="150" r="10" fill="#fff" stroke="#2b1d14" stroke-width="4"/>
<circle cx="112" cy="153" r="5" fill="#2b1d14"/><circle cx="144" cy="153" r="5" fill="#2b1d14"/>'''
angry = '<path d="M96 134 l24 8 M160 134 l-24 8" stroke="#2b1d14" stroke-width="7" stroke-linecap="round"/>'
steam = '''<g fill="#fff" stroke="#9aa" stroke-width="3" opacity="0.95">
<circle cx="92" cy="226" r="10"/><circle cx="78" cy="238" r="7"/><circle cx="164" cy="226" r="10"/><circle cx="178" cy="238" r="7"/></g>'''
save("toro-despierto", f'''
    <ellipse cx="128" cy="236" rx="86" ry="12" fill="#000" opacity="0.15"/>
    <rect x="48" y="60" width="28" height="40" rx="10" fill="{BULL_D}" {K}/>
    <rect x="180" y="60" width="28" height="40" rx="10" fill="{BULL_D}" {K}/>
    <rect x="48" y="140" width="28" height="40" rx="10" fill="{BULL_D}" {K}/>
    <rect x="180" y="140" width="28" height="40" rx="10" fill="{BULL_D}" {K}/>
    <path d="M128 40 Q150 16 168 22" fill="none" stroke="#2b1d14" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="128" cy="104" rx="76" ry="72" fill="{BULL}" {K}/>
    <ellipse cx="100" cy="84" rx="22" ry="16" fill="{BULL_D}"/>
    <ellipse cx="160" cy="114" rx="18" ry="12" fill="{BULL_D}"/>
    {bull_head(162, open_eyes, angry)}{steam}
''')

charge_eyes = '''<circle cx="110" cy="166" r="8" fill="#fff" stroke="#2b1d14" stroke-width="4"/>
<circle cx="146" cy="166" r="8" fill="#fff" stroke="#2b1d14" stroke-width="4"/>
<circle cx="111" cy="168" r="4" fill="#e24a3b"/><circle cx="145" cy="168" r="4" fill="#e24a3b"/>'''
angry2 = '<path d="M94 150 l26 10 M162 150 l-26 10" stroke="#2b1d14" stroke-width="8" stroke-linecap="round"/>'
dust = '''<g fill="#e8d6a8" stroke="#b89c64" stroke-width="3">
<circle cx="70" cy="22" r="16"/><circle cx="96" cy="12" r="12"/><circle cx="160" cy="14" r="13"/><circle cx="188" cy="24" r="16"/><circle cx="128" cy="8" r="9"/></g>
<path d="M40 60 v40 M216 60 v40 M30 120 v30 M226 120 v30" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="0.9"/>'''
save("toro-cargando", f'''
    <ellipse cx="128" cy="240" rx="80" ry="10" fill="#000" opacity="0.15"/>
    {dust}
    <rect x="54" y="52" width="26" height="46" rx="10" fill="{BULL_D}" {K} transform="rotate(-15 67 75)"/>
    <rect x="176" y="52" width="26" height="46" rx="10" fill="{BULL_D}" {K} transform="rotate(15 189 75)"/>
    <rect x="52" y="150" width="26" height="40" rx="10" fill="{BULL_D}" {K} transform="rotate(20 65 170)"/>
    <rect x="178" y="150" width="26" height="40" rx="10" fill="{BULL_D}" {K} transform="rotate(-20 191 170)"/>
    <ellipse cx="128" cy="112" rx="72" ry="74" fill="{BULL}" {K}/>
    <ellipse cx="102" cy="92" rx="20" ry="16" fill="{BULL_D}"/>
    <g transform="translate(0,20)">
    <ellipse cx="{128-44}" cy="146" rx="16" ry="9" fill="{BULL}" {K}/>
    <ellipse cx="{128+44}" cy="146" rx="16" ry="9" fill="{BULL}" {K}/>
    <path d="M96 150 Q60 170 58 206" fill="none" stroke="#2b1d14" stroke-width="20" stroke-linecap="round"/>
    <path d="M96 150 Q60 170 58 206" fill="none" stroke="#fff6e0" stroke-width="12" stroke-linecap="round"/>
    <path d="M160 150 Q196 170 198 206" fill="none" stroke="#2b1d14" stroke-width="20" stroke-linecap="round"/>
    <path d="M160 150 Q196 170 198 206" fill="none" stroke="#fff6e0" stroke-width="12" stroke-linecap="round"/>
    <ellipse cx="128" cy="164" rx="40" ry="34" fill="{BULL}" {K}/>
    </g>
    <g transform="translate(0,20)">{charge_eyes}{angry2}
    <ellipse cx="128" cy="200" rx="26" ry="14" fill="#f0a8a0" {K}/>
    <ellipse cx="119" cy="200" rx="4" ry="5" fill="#2b1d14"/><ellipse cx="137" cy="200" rx="4" ry="5" fill="#2b1d14"/></g>
''')

# ---------- objetos ----------
def star(cx, cy, r1, r2, n=5, rot=-90):
    import math
    pts = []
    for i in range(n*2):
        r = r1 if i % 2 == 0 else r2
        a = math.radians(rot + i*180/n)
        pts.append(f"{cx+r*math.cos(a):.1f},{cy+r*math.sin(a):.1f}")
    return " ".join(pts)

save("moneda", f'''
    <circle cx="128" cy="134" r="96" fill="#c98a12" {K}/>
    <circle cx="128" cy="126" r="96" fill="#ffc92e" {K}/>
    <circle cx="128" cy="126" r="72" fill="none" stroke="#e0a414" stroke-width="8"/>
    <polygon points="{star(128,130,50,22)}" fill="#fff0a0" {K4}/>
    <path d="M70 80 Q90 50 124 44" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
    <polygon points="{star(206,44,26,6,4,0)}" fill="#fff"/>
''')

def boot(dx):
    return f'''<g transform="translate({dx},0)">
    <path d="M40 60 h56 v98 q0 10 10 12 l40 8 q18 4 18 22 v14 h-126z" fill="#8a4fd8" {K}/>
    <rect x="34" y="50" width="68" height="22" rx="8" fill="#b88cf5" {K}/>
    <path d="M36 204 h132 v14 q0 8 -8 8 h-116 q-8 0 -8 -8z" fill="#f4f0ff" {K}/>
    <path d="M52 100 h36 M52 124 h36" stroke="#b88cf5" stroke-width="6" stroke-linecap="round"/>
    </g>'''
save("botas-silenciosas", f'''
    <ellipse cx="128" cy="236" rx="100" ry="10" fill="#000" opacity="0.15"/>
    <g transform="scale(0.7) translate(4,90)">{boot(0)}{boot(150)}</g>
    <polygon points="{star(40,50,18,5,4,0)}" fill="#7fe3ff"/>
    <polygon points="{star(214,70,22,6,4,0)}" fill="#7fe3ff"/>
    <polygon points="{star(128,34,14,4,4,0)}" fill="#fff"/>
    <polygon points="{star(226,170,12,3,4,0)}" fill="#fff"/>
    <polygon points="{star(22,160,12,3,4,0)}" fill="#7fe3ff"/>
''')

save("casa", f'''
    <rect x="30" y="200" width="196" height="30" fill="#000" opacity="0.15" rx="10"/>
    <rect x="34" y="150" width="188" height="72" rx="6" fill="#e8c890" {K}/>
    <path d="M34 170 h188 M34 192 h188" stroke="#c9a468" stroke-width="4"/>
    <rect x="108" y="164" width="40" height="58" rx="6" fill="#8a4f2a" {K}/>
    <circle cx="140" cy="194" r="4" fill="#ffd34d"/>
    <rect x="52" y="168" width="36" height="30" rx="4" fill="#9fe0ff" {K4}/>
    <rect x="168" y="168" width="36" height="30" rx="4" fill="#9fe0ff" {K4}/>
    <path d="M22 156 L22 44 Q22 30 36 30 L220 30 Q234 30 234 44 L234 156z" fill="#e24a3b" {K}/>
    <path d="M128 30 v126" stroke="#9e2a20" stroke-width="8"/>
    <path d="M22 70 h212 M22 110 h212" stroke="#c43a2d" stroke-width="4"/>
    <rect x="164" y="40" width="30" height="34" rx="4" fill="#9a8a80" {K}/>
    <circle cx="186" cy="22" r="10" fill="#eee" opacity="0.9"/><circle cx="200" cy="10" r="7" fill="#eee" opacity="0.8"/>
''')

save("cueva", f'''
    <ellipse cx="128" cy="222" rx="116" ry="20" fill="#000" opacity="0.15"/>
    <path d="M10 214 Q14 90 70 50 Q128 12 186 50 Q242 90 246 214z" fill="#9c8b7a" {K}/>
    <path d="M40 120 q20 -14 40 -4 M170 80 q24 -6 40 16 M190 150 q16 -8 30 4 M30 170 q14 -6 26 4" fill="none" stroke="#7a6a5c" stroke-width="6" stroke-linecap="round"/>
    <path d="M58 60 q20 -18 46 -16" fill="none" stroke="#bfae9c" stroke-width="8" stroke-linecap="round"/>
    <path d="M70 214 Q72 120 128 110 Q184 120 186 214z" fill="#2a1e24" {K}/>
    <path d="M86 214 Q90 140 128 132 Q166 140 170 214z" fill="#1a1216"/>
    <circle cx="110" cy="196" r="10" fill="#ffc92e" stroke="#c98a12" stroke-width="3"/>
    <circle cx="140" cy="202" r="10" fill="#ffc92e" stroke="#c98a12" stroke-width="3"/>
    <circle cx="126" cy="186" r="9" fill="#ffc92e" stroke="#c98a12" stroke-width="3"/>
    <polygon points="{star(150,176,10,3,4,0)}" fill="#fff"/>
    <path d="M24 214 q10 -20 24 -4 q8 -16 22 0" fill="#5cc46a" {K4}/>
    <path d="M190 214 q10 -20 24 -4 q8 -16 22 0" fill="#5cc46a" {K4}/>
''')

# pasto: mosaico sin cortes (lo que sale por un borde entra por el otro)
random.seed(7)
items = []
def wrap(x, y, fn):
    for ox in (-256, 0, 256):
        for oy in (-256, 0, 256):
            items.append(fn(x+ox, y+oy))
for _ in range(26):
    x, y = random.uniform(0, 256), random.uniform(0, 256)
    wrap(x, y, lambda a, b: f'<path d="M{a-6:.1f} {b:.1f} l3 -10 l3 8 l3 -12 l3 12 l3 -8" fill="none" stroke="#4fa84a" stroke-width="3" stroke-linecap="round"/>')
for _ in range(7):
    x, y = random.uniform(0, 256), random.uniform(0, 256)
    col = random.choice(["#ffe14d", "#ffffff", "#ffffff", "#ffd0e8"])
    wrap(x, y, lambda a, b, c=col: f'<g><circle cx="{a-4:.1f}" cy="{b:.1f}" r="3.5" fill="{c}"/><circle cx="{a+4:.1f}" cy="{b:.1f}" r="3.5" fill="{c}"/><circle cx="{a:.1f}" cy="{b-4:.1f}" r="3.5" fill="{c}"/><circle cx="{a:.1f}" cy="{b+4:.1f}" r="3.5" fill="{c}"/><circle cx="{a:.1f}" cy="{b:.1f}" r="2.5" fill="#f5a623"/></g>')
for _ in range(10):
    x, y = random.uniform(0, 256), random.uniform(0, 256)
    wrap(x, y, lambda a, b: f'<ellipse cx="{a:.1f}" cy="{b:.1f}" rx="18" ry="10" fill="#79cf5e" opacity="0.6"/>')
save("pasto", '<rect width="256" height="256" fill="#6cc25a"/>' + "".join(items))

save("arbusto", f'''
    <ellipse cx="128" cy="220" rx="96" ry="18" fill="#000" opacity="0.15"/>
    <g fill="#3f9a3f" {K}>
    <circle cx="80" cy="150" r="54"/><circle cx="176" cy="150" r="54"/><circle cx="128" cy="100" r="60"/><circle cx="128" cy="164" r="58"/>
    </g>
    <path d="M96 150 a54 54 0 0 1 64 0 M112 104 a30 30 0 0 1 40 -6" fill="none" stroke="#3f9a3f" stroke-width="14"/>
    <circle cx="104" cy="84" r="16" fill="#6fc75c"/><circle cx="68" cy="136" r="12" fill="#6fc75c"/><circle cx="158" cy="120" r="10" fill="#6fc75c"/>
    <circle cx="150" cy="178" r="8" fill="#e84a6a" stroke="#2b1d14" stroke-width="3"/>
    <circle cx="96" cy="176" r="8" fill="#e84a6a" stroke="#2b1d14" stroke-width="3"/>
    <circle cx="176" cy="148" r="8" fill="#e84a6a" stroke="#2b1d14" stroke-width="3"/>
''')

save("cerca", f'''
    <rect x="0" y="36" width="256" height="16" rx="4" fill="#b87a44" {K4}/>
    <rect x="0" y="62" width="256" height="16" rx="4" fill="#b87a44" {K4}/>
    <g fill="#8f5a2e" {K4}>
    <rect x="8" y="18" width="26" height="80" rx="6"/><rect x="115" y="18" width="26" height="80" rx="6"/><rect x="222" y="18" width="26" height="80" rx="6"/>
    </g>
    <path d="M14 30 h14 M121 30 h14 M228 30 h14" stroke="#b87a44" stroke-width="4"/>
''', w=256, h=112)

# ---------- fondo de inicio 16:9 ----------
def use_img(name, x, y, s):
    import base64
    data = base64.b64encode(open(f"{OUT}/{name}.png", "rb").read()).decode()
    return f'<image href="data:image/png;base64,{data}" x="{x}" y="{y}" width="{s}" height="{s}"/>'
clouds = "".join(f'<g fill="#fff"><ellipse cx="{x}" cy="{y}" rx="60" ry="26"/><ellipse cx="{x+40}" cy="{y-14}" rx="42" ry="28"/><ellipse cx="{x-36}" cy="{y-6}" rx="34" ry="22"/></g>' for x, y in [(180,90),(560,60),(880,110)])
bg = f'''
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fc2ff"/><stop offset="1" stop-color="#bfeaff"/></linearGradient></defs>
    <rect width="1024" height="576" fill="url(#sky)"/>
    <circle cx="900" cy="80" r="50" fill="#ffe14d"/><circle cx="900" cy="80" r="66" fill="#ffe14d" opacity="0.3"/>
    {clouds}
    <path d="M0 330 Q200 250 420 300 Q640 350 1024 270 V576 H0z" fill="#8fd36a"/>
    <path d="M0 400 Q300 340 600 390 Q820 430 1024 380 V576 H0z" fill="#6cc25a"/>
    {use_img("cueva", 700, 170, 260)}
    {use_img("casa", 40, 240, 230)}
    {use_img("toro-dormido", 330, 350, 170)}
    {use_img("toro-dormido", 540, 400, 150)}
    {use_img("toro-dormido", 760, 390, 160)}
    {use_img("arbusto", 260, 250, 90)}
    {use_img("arbusto", 920, 440, 90)}
    <g font-family="DejaVu Sans" font-weight="bold" fill="#fff" stroke="#2b1d14" stroke-width="3">
    <text x="420" y="370" font-size="34">z</text><text x="440" y="345" font-size="26">z</text>
    <text x="620" y="415" font-size="30">z</text><text x="638" y="392" font-size="22">z</text>
    <text x="900" y="430" font-size="32">z</text><text x="920" y="408" font-size="24">z</text></g>
'''
save("fondo-inicio", bg, w=1024, h=576, scale=1)

# ---------- logo ----------
logo = f'''
    <g font-family="DejaVu Sans" font-weight="bold" text-anchor="middle">
    <text x="512" y="140" font-size="96" fill="#2b1d14" stroke="#2b1d14" stroke-width="22" stroke-linejoin="round">El Mundo</text>
    <text x="512" y="140" font-size="96" fill="#ffc92e" stroke="#c98a12" stroke-width="3">El Mundo</text>
    <text x="512" y="268" font-size="96" fill="#2b1d14" stroke="#2b1d14" stroke-width="22" stroke-linejoin="round">de Gliff</text>
    <text x="512" y="268" font-size="96" fill="#e24a3b" stroke="#9e2a20" stroke-width="3">de Gliff</text>
    </g>
    {use_img("toro-dormido", 840, 170, 140)}
    <text x="950" y="185" font-family="DejaVu Sans" font-weight="bold" font-size="30" fill="#fff" stroke="#2b1d14" stroke-width="2">z</text>
'''
save("logo", logo, w=1024, h=320, scale=1)
print(sorted(os.listdir(OUT)))
