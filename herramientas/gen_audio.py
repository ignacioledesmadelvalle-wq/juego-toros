import numpy as np, os, subprocess, wave

SR = 44100
BASE = "assets"
rng = np.random.default_rng(3)

def t(d): return np.arange(int(SR*d))/SR
def env(n, a=0.005, r=0.1):
    e = np.ones(n); na, nr = int(SR*a), min(int(SR*r), n)
    if na: e[:na] = np.linspace(0, 1, na)
    if nr: e[-nr:] *= np.linspace(1, 0, nr)
    return e
def lp(x, a):  # filtro pasa bajos simple (a entre 0 y 1, menor = más oscuro)
    y = np.zeros_like(x); p = 0.0
    for i, v in enumerate(x):
        p += a*(v-p); y[i] = p
    return y
def freq(n): return 440*2**((n-69)/12)
NOTE = {'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}
def m(s):  # "G4", "F#3"
    n = NOTE[s[0]]; i = 1
    if s[1] in '#b': n += 1 if s[1]=='#' else -1; i = 2
    return 12*(int(s[i:])+1)+n

def pluck(f, d, bright=1.0, decay=6):
    x = t(d); s = np.zeros_like(x)
    for h, amp in [(1,1),(2,.6*bright),(3,.35*bright),(4,.2*bright),(5,.12*bright),(6,.07*bright)]:
        s += amp*np.sin(2*np.pi*f*h*x)*np.exp(-x*decay*(1+h*0.4))
    return s*env(len(x), .002, .02)
def square(f, d, duty=.5):
    x = t(d); return np.where((x*f) % 1 < duty, 1., -1.)
def tone(f, d): return np.sin(2*np.pi*f*t(d))
def noise(d): return rng.uniform(-1, 1, int(SR*d))

def mix(total, events):
    out = np.zeros(int(SR*total)+SR*2)
    for start, sig in events:
        i = int(SR*start); out[i:i+len(sig)] += sig
    return out
def fold_loop(x, total):  # la cola que sobra vuelve al principio: loop sin cortes
    n = int(SR*total); y = x[:n].copy(); tail = x[n:]
    y[:len(tail)] += tail[:n]; return y

def write(path, x, peak=0.8):
    x = x/ (np.max(np.abs(x))+1e-9)*peak
    wav = path.replace('.mp3', '.wav')
    with wave.open(wav, 'w') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x*32767).astype(np.int16).tobytes())
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',wav,'-b:a','128k',path], check=True)
    os.remove(wav)

os.makedirs(f"{BASE}/music", exist_ok=True); os.makedirs(f"{BASE}/sfx", exist_ok=True)

# ===================== MÚSICA =====================
def song(bpm, bars, chords, melody, bass_style, lead, loop=True, drums=True, lead_vol=.5):
    beat = 60/bpm; total = bars*4*beat; ev = []
    for b, ch in enumerate(chords):  # acordes: bajo + rasgueo
        root = m(ch[0]); tri = [m(n) for n in ch[1]]
        for k in range(4):
            st = (b*4+k)*beat
            if bass_style == 'boom':
                bn = root if k % 2 == 0 else root+7
                ev.append((st, .55*pluck(freq(bn), beat*.9, .4, 5)))
                if k % 2 == 1:
                    for j, n in enumerate(tri): ev.append((st+j*.012, .16*pluck(freq(n), beat*.6, 1.2, 9)))
            else:  # 'walk' pizzicato
                bn = root + [0, 7, 12, 7][k]
                ev.append((st, .5*pluck(freq(bn), beat*.35, .5, 14)))
                if k in (1, 3):
                    for j, n in enumerate(tri): ev.append((st+j*.01, .1*pluck(freq(n), beat*.25, 1, 18)))
        if drums:
            for k in range(8):
                st = (b*4)*beat + k*beat/2
                a = .12 if k % 2 == 0 else .06
                ev.append((st, a*lp(noise(.05), .5)*np.exp(-t(.05)*60)))
    pos = 0
    for n, dur in melody:
        if n != 'R': ev.append((pos*beat, lead_vol*lead(freq(m(n)), dur*beat)))
        pos += dur
    x = mix(total, ev)
    return fold_loop(x, total) if loop else x[:int(SR*(total+1.5))]

banjo = lambda f, d: pluck(f, max(d, .15)+.2, 1.4, 5)
G, C, D, Em = ('G2',['G3','B3','D4']), ('C3',['C4','E4','G4']), ('D3',['D4','F#4','A4']), ('E2',['E3','G3','B3'])
menu_mel = [('D4',.5),('G4',.5),('B4',.5),('G4',.5),('D5',1),('B4',1),
            ('C5',.5),('B4',.5),('A4',.5),('G4',.5),('E4',1),('G4',1),
            ('A4',.5),('B4',.5),('C5',.5),('A4',.5),('D5',1),('C5',.5),('A4',.5),
            ('B4',1),('G4',1),('A4',1),('R',1),
            ('D4',.5),('G4',.5),('B4',.5),('G4',.5),('D5',1),('E5',1),
            ('C5',.5),('E5',.5),('D5',.5),('C5',.5),('B4',1),('G4',1),
            ('A4',.5),('B4',.5),('C5',.5),('B4',.5),('A4',1),('F#4',1),
            ('G4',2),('R',2)]
write(f"{BASE}/music/menu.mp3", song(116, 8, [G,C,D,G,G,C,D,G], menu_mel, 'boom', banjo))

pizz = lambda f, d: pluck(f, .22, .7, 16)
Dm, Gm, A7, Bb = ('D3',['D4','F4','A4']), ('G2',['G3','Bb3','D4']), ('A2',['A3','C#4','E4']), ('Bb2',['Bb3','D4','F4'])
tip = [('D5',.5),('R',.5),('A4',.5),('R',.5),('F4',.5),('G4',.5),('A4',.5),('R',.5),
       ('Bb4',.5),('R',.5),('G4',.5),('R',.5),('D4',.5),('E4',.5),('F4',.5),('R',.5),
       ('E4',.5),('F4',.5),('G4',.5),('A4',.5),('Bb4',.5),('A4',.5),('G4',.5),('E4',.5),
       ('D4',.5),('R',.5),('A4',.25),('R',.25),('D5',.25),('R',.75),('R',1),
       ('F5',.5),('R',.5),('E5',.5),('R',.5),('D5',.5),('C#5',.5),('D5',.5),('R',.5),
       ('D5',.5),('R',.5),('Bb4',.5),('R',.5),('G4',.5),('A4',.5),('Bb4',.5),('R',.5),
       ('A4',.5),('G4',.5),('F4',.5),('E4',.5),('F4',.5),('G4',.5),('A4',.5),('C#5',.5),
       ('D5',.5),('R',.5),('A4',.5),('R',.5),('D4',1),('R',1)]
write(f"{BASE}/music/juego.mp3", song(104, 8, [Dm,Gm,A7,Dm,Dm,Gm,A7,Dm], tip, 'walk', pizz, lead_vol=.6))

trumpet = lambda f, d: lp(square(f, d+.05, .35)*env(int(SR*(d+.05)), .02, .08), .25)
fan = [('G4',.33),('B4',.33),('D5',.33),('G5',1.2)]
x = mix(3, [(0, .3*pluck(freq(m('G2')),2,.5,3))] + [(i*.17, .5*trumpet(freq(m(n)), d*.5)) for i,(n,d) in enumerate(fan)]
        + [(.5+i*.06, .25*pluck(freq(m(n)), 1.5, 1.4, 4)) for i, n in enumerate(['G3','B3','D4','G4','B4','D5'])])
write(f"{BASE}/music/nivel-completado.mp3", x[:int(SR*3.2)])

def duo(f, d):
    a = .6*banjo(f, d); b = .5*trumpet(f, d); n = max(len(a), len(b))
    return np.pad(a, (0, n-len(a))) + np.pad(b, (0, n-len(b)))
win_mel = [('G4',.5),('G4',.5),('G4',.5),('B4',.5),('D5',1),('B4',.5),('D5',.5),
           ('E5',1),('D5',.5),('C5',.5),('B4',1),('A4',1),
           ('G4',.5),('B4',.5),('D5',.5),('G5',.5),('F#5',1),('E5',.5),('F#5',.5),
           ('G5',3),('R',1)]
x = song(128, 4, [G,C,D,G], win_mel, 'boom', duo, loop=False)
claps = [(0.5*k*60/128 + 3*60/128*4, .1*lp(noise(.08),.7)*np.exp(-t(.08)*40)) for k in range(16)]
x = x + mix(len(x)/SR, claps)[:len(x)]
write(f"{BASE}/music/ganaste.mp3", x)

def trombone(f0, d, drop=0.0):
    x = t(d); f = f0*(1 - drop*x/d)
    ph = 2*np.pi*np.cumsum(f*(1+.012*np.sin(2*np.pi*6*x)))/SR
    s = sum(np.sin(h*ph)/h for h in range(1, 8))
    return lp(s*env(len(x), .04, .1), .15)
x = mix(3, [(0, trombone(freq(m('G3')), .45)), (.5, trombone(freq(m('F#3')), .45)),
            (1.0, trombone(freq(m('F3')), .45)), (1.5, trombone(freq(m('E3')), 1.3, .06))])
write(f"{BASE}/music/perdiste.mp3", x[:int(SR*3)])

# ===================== EFECTOS =====================
def thud(d=.09, bright=.25):
    return lp(noise(d), bright)*np.exp(-t(d)*50)
write(f"{BASE}/sfx/pasos.mp3", mix(.35, [(0, thud()), (.18, .8*thud())])[:int(SR*.35)], .6)

def snore():
    d = 1.4; x = t(d)
    amp = np.sin(np.pi*x/d)**2
    growl = square(38+8*np.sin(np.pi*x/d), d)*.5 + noise(d)*.6
    return lp(growl, .06)*amp
write(f"{BASE}/sfx/ronquido.mp3", snore(), .6)

x = t(.5); ding = (np.sin(2*np.pi*1568*x)+.4*np.sin(2*np.pi*2352*x))*np.exp(-x*9)
write(f"{BASE}/sfx/alerta.mp3", ding + np.concatenate([np.zeros(int(SR*.08)), .7*ding])[:len(ding)])

def moo():
    d = 1.5; x = t(d)
    f = 95 + 45*np.sin(np.pi*np.clip(x/1.1, 0, 1))
    ph = 2*np.pi*np.cumsum(f)/SR
    s = sum(np.sin(h*ph)*(1 if h in (3, 4, 5) else .4)/h for h in range(1, 12))
    return lp(s*env(len(x), .08, .35), .12)
write(f"{BASE}/sfx/mugido.mp3", moo())

x = t(.6); snort = lp(noise(.6), .35)*np.exp(-((x-.12)/.08)**2) + lp(noise(.6), .2)*np.exp(-((x-.38)/.1)**2)*.9
write(f"{BASE}/sfx/bufido.mp3", snort)

gallop = []
for k in range(8):
    base = k*.25
    for o, a in [(0, 1), (.07, .8), (.14, .9)]: gallop.append((base+o, a*thud(.08, .18)))
write(f"{BASE}/sfx/galope.mp3", mix(2.0, gallop)[:int(SR*2.0)])

def blip(f, d, duty=.5): return square(f, d, duty)*np.exp(-t(d)*8)*env(int(SR*d), .001, .02)
write(f"{BASE}/sfx/moneda.mp3", mix(.4, [(0, .5*blip(988, .08)), (.07, .5*blip(1319, .3))])[:int(SR*.4)], .6)

up = ['C5','E5','G5','C6','E6','G6','C7']
write(f"{BASE}/sfx/botas.mp3", mix(1.0, [(i*.06, .4*(tone(freq(m(n)), .35)*np.exp(-t(.35)*9))) for i, n in enumerate(up)])[:int(SR*1.0)], .6)
write(f"{BASE}/sfx/botas-fin.mp3", mix(1.0, [(i*.08, .4*(tone(freq(m(n)), .35)*np.exp(-t(.35)*9))) for i, n in enumerate(reversed(up))])[:int(SR*1.0)], .6)

x = t(.05); write(f"{BASE}/sfx/click.mp3", np.sin(2*np.pi*900*x)*np.exp(-x*120), .5)
print("listo")
