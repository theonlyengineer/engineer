import{_ as K}from"./CnCFyd3B.js";import{_ as Z}from"./x2Wuztt8.js";import{_ as ee}from"./D2DYqgxr.js";import{c as u,o as h,a as t,n as w,w as m,t as v,q as L,N as ne,D as te,O as se,L as oe,m as f,M as ie,h as D,l as $,j as ae,k as re,B as le,u as he,y as e,P as q,F as M,x as Y,z as E,Q as de,I as ce,R as ue,f as H}from"./DjF26c9n.js";import{_ as me}from"./CwkFmkUH.js";import{u as pe}from"./Hz0TM2BS.js";const ge={class:"fixed top-0 inset-x-0 z-30 h-20 bg-[#FFFBF5]/90 backdrop-blur-sm border-b border-black/[0.08]"},ye={class:"layout-wrapper flex items-center gap-6 h-full"},fe={class:"min-w-0"},we={class:"block font-serif text-xl md:text-2xl font-bold leading-tight truncate group-hover:text-c1 transition-colors duration-150"},be={class:"block text-[0.7rem] uppercase tracking-[0.15em] opacity-40 mt-0.5"},ve={class:"hidden md:block font-mono text-sm opacity-45 shrink-0"},ke={class:"absolute bottom-0 inset-x-0 h-[3px] bg-black/[0.06]"},xe={__name:"header",props:{course:{type:Object,required:!0},lessonIndex:{type:Number,default:0},percent:{type:Number,default:0}},emits:["toggle-contents"],setup(p){return(d,l)=>{const r=K,n=Z;return h(),u("header",ge,[t("div",ye,[w(r,{to:`/courses/${p.course.slug}`,class:"flex items-center gap-3.5 shrink-0 min-w-0 group"},{default:m(()=>[l[1]||(l[1]=t("img",{src:ee,alt:"",class:"size-10 shrink-0"},null,-1)),t("span",fe,[t("span",we,v(p.course.title),1),t("span",be," Lesson "+v(p.lessonIndex+1)+" of "+v(p.course.lessons.length),1)])]),_:1},8,["to"]),l[3]||(l[3]=t("div",{class:"flex-1"},null,-1)),w(n,null,{default:m(()=>[t("span",ve,v(p.percent)+"% complete ",1)]),_:1}),t("button",{class:"lg:hidden text-sm px-4 py-2 rounded-full border border-black/15 hover:bg-black hover:text-white hover:border-black transition-colors duration-150 shrink-0",onClick:l[0]||(l[0]=o=>d.$emit("toggle-contents"))}," Contents "),w(r,{to:`/courses/${p.course.slug}`,class:"text-sm font-medium px-5 py-2 rounded-full border border-black/15 hover:bg-black hover:text-white hover:border-black transition-colors duration-150 shrink-0"},{default:m(()=>l[2]||(l[2]=[L(" Exit ")])),_:1},8,["to"])]),w(n,null,{default:m(()=>[t("div",ke,[t("div",{class:"h-full bg-c1 transition-[width] duration-500 ease-out",style:ne({width:`${p.percent}%`})},null,4)])]),_:1})])}}},Te=`When you open a terminal, you are not talking to Linux. You are talking to a program that talks to Linux on your behalf. That program is called a **shell**.

This distinction sounds pedantic, but it explains almost everything that confuses beginners — why \`cd\` behaves differently from \`ls\`, why a command works in one terminal and not another, and why the error message you get is sometimes from the shell and sometimes from the program you tried to run.

## The terminal and the shell are different things

The **terminal** is the window. It draws text on your screen and collects your keystrokes. Historically it was a physical device — a keyboard and a screen wired to a computer somewhere else. The window on your desktop is emulating that hardware, which is why it's properly called a *terminal emulator*.

The **shell** is the program running inside that window. It reads what you type, works out what you meant, runs it, and prints the result. On most Linux systems the default shell is \`bash\`; on modern macOS it's \`zsh\`. They're different programs that happen to speak an almost identical language.

::terminal-teaser
---
lines:
  - cmd: echo $SHELL
    out: /bin/bash
  - cmd: whoami
    out: you
  - cmd: date
    out: Wed Aug 19 09:14:22 UTC 2026
---
::

## The read-evaluate-print loop

Everything a shell does fits in one sentence: it prints a prompt, waits for a line, runs it, and repeats.

That prompt — usually ending in \`$\` — is the shell telling you it is ready. When a command is running, the prompt disappears; when it comes back, the command has finished. Learning to read that rhythm is most of what "being comfortable at the terminal" means.

When you type a line and press enter, the shell splits it into words. The first word is the **command**. Everything after it is an **argument**:

\`\`\`
ls -l /etc
│  │   │
│  │   └── argument: which directory to list
│  └────── option (also an argument, but it modifies behaviour)
└───────── command: the program to run
\`\`\`

The shell then looks for a program with that name, hands it the arguments, and gets out of the way. The output you see is usually printed by the *program*, not the shell.

::quiz
---
question: You type \`cat notes.txt\` and see "No such file or directory". Who printed that message?
options:
  - The \`cat\` program, because it was the thing that tried and failed to open the file
  - The shell, because it checks that files exist before running anything
  - The Linux kernel, printing directly to your screen
answer: 0
explanation: The shell only found and launched \`cat\`. It doesn't know or care what arguments mean. \`cat\` took "notes.txt", asked the kernel to open it, was told it doesn't exist, and printed the complaint itself.
---
::

## Where commands come from

Most commands are just files on disk. \`ls\` is a real program sitting at \`/usr/bin/ls\`. When you type \`ls\`, the shell searches a list of directories for something by that name, and runs the first match it finds.

That list lives in a variable called \`PATH\`. You can see it:

\`\`\`
echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/local/games
\`\`\`

The colons separate directories. The shell checks them left to right. This is why "command not found" almost never means the program is missing — it usually means it exists somewhere that isn't on your \`PATH\`.

::deep-dive{title="So why is \`cd\` different?"}
Because \`cd\` is not a file anywhere. It's built into the shell itself.

It has to be. Changing directory changes the state of the shell process. If \`cd\` were a separate program, it would change *its own* directory, then exit — leaving the shell exactly where it started. A handful of commands work this way for the same reason: \`cd\`, \`export\`, \`exit\`, and a few others are called **builtins**.

You can check which is which with \`type\`:

\`\`\`
type ls
ls is /usr/bin/ls

type cd
cd is a shell builtin
\`\`\`
::

## Why this is worth your time

You can use a computer for years without touching a shell. But every server you will ever ssh into, every Docker container you will ever debug, and every CI pipeline you will ever fix is a text interface with no GUI available. The command line isn't nostalgia — it's the only interface that exists in the places software actually runs.

It is also the fastest one. A GUI can only offer what someone designed a button for. A shell lets you combine small programs in ways nobody anticipated, which is what the last lesson of this course is about.

::quiz
---
question: What does \`PATH\` actually contain?
options:
  - A list of directories the shell searches for programs
  - A list of every command installed on the system
  - The directory you are currently in
answer: 0
explanation: It's a colon-separated list of directories, searched left to right. The first matching program wins — which is also how you can shadow a system command with your own version.
---
::

Next up: moving around the filesystem, which is where almost all your time at the prompt is spent.
`,_e=`Linux has no drive letters. There is no \`C:\`. Everything — every disk, every USB stick, every device, every file — hangs off a single tree that starts at \`/\`, called the **root**.

Getting comfortable at the command line is mostly getting comfortable moving around this tree without looking at it.

## Three commands do almost everything

\`pwd\` tells you where you are. \`ls\` shows you what's here. \`cd\` moves you somewhere else. That's the loop, and you'll run it thousands of times.

::terminal-teaser
---
lines:
  - cmd: pwd
    out: /home/you
  - cmd: ls
    out: "Desktop  Documents  Downloads  notes.txt  projects"
  - cmd: cd projects
  - cmd: pwd
    out: /home/you/projects
---
::

Notice the third command printed nothing. That's not a failure — it's the Unix convention that **silence means success**. Commands that worked usually say nothing at all. If you wanted reassurance, you'd have to ask for it with \`pwd\`.

## Absolute and relative paths

A path starting with \`/\` is **absolute** — it's measured from the root of the tree, so it means the same thing no matter where you are:

\`\`\`
cd /var/log
\`\`\`

A path not starting with \`/\` is **relative** — it's measured from wherever you currently are:

\`\`\`
cd projects/website
\`\`\`

Relative paths are shorter to type and are what you'll use most. Absolute paths are unambiguous and are what you'll use in scripts, where "wherever you currently are" isn't something you can rely on.

There are four shorthands worth memorising today:

- \`.\` — the current directory
- \`..\` — the parent directory (one level up)
- \`~\` — your home directory, e.g. \`/home/you\`
- \`-\` — the directory you were in *before* the last \`cd\`, which makes \`cd -\` a toggle between two places

::quiz
---
question: "You are in /home/you/projects/website. Where does \`cd ../..\` put you?"
options:
  - /home/you
  - /home/you/projects
  - /home
  - The root directory, /
answer: 0
explanation: "Each \`..\` climbs one level. From /home/you/projects/website, the first takes you to projects, the second to /home/you."
---
::

## Reading \`ls\` properly

Bare \`ls\` gives you names. The options are where it gets useful:

\`\`\`
ls -l     # long format: permissions, owner, size, modified date
ls -a     # include hidden files (anything starting with a dot)
ls -lh    # long format, human-readable sizes (4.0K instead of 4096)
ls -lt    # sort by modification time, newest first
\`\`\`

Options can be combined, so \`ls -lah\` is the same as \`ls -l -a -h\` and is worth building into muscle memory.

"Hidden" files aren't secure or special — the rule is literally just *"the name starts with a dot"*. It's a convention to keep config files (\`.bashrc\`, \`.gitignore\`, \`.env\`) out of your way. \`ls -a\` reveals them.

::fill-blank
---
prompt: List everything in the current directory, including hidden files, in long format with readable sizes.
answer:
  - ls -lah
  - ls -alh
  - ls -lha
  - ls -hla
  - ls -ahl
  - ls -hal
hint: You need three options — long, all, human-readable. Their order doesn't matter.
placeholder: ls ...
explanation: Any order works. \`ls -lah\` is the one most people's fingers learn.
---
::

## Let the shell type for you

Press **Tab** while typing a path and the shell will complete it. Press it twice and it shows you every possibility.

This is not a nicety. Tab completion is the difference between the command line feeling slow and feeling fast, and it doubles as a correctness check — if Tab won't complete what you're typing, the thing you're referring to probably doesn't exist. Experienced people almost never type a full path.

<!-- slide -->

::deep-dive{title="Directories worth recognising"}
You don't need to memorise the filesystem, but recognising these saves a lot of confusion:

- \`/home/you\` — your stuff. Also written \`~\`.
- \`/etc\` — system-wide configuration files. Text, all of it.
- \`/var/log\` — logs. The first place to look when something is broken.
- \`/usr/bin\` — most of the programs you run.
- \`/tmp\` — scratch space, wiped on reboot.
- \`/opt\` — optional or third-party software.

The pattern to notice is that configuration is text in \`/etc\`, and diagnostics are text in \`/var/log\`. This is why the command line remains the fastest way to debug a Linux machine — the answers are all in files you can read.
::

::quiz
---
question: What makes a file "hidden" in Linux?
options:
  - Its name begins with a dot
  - A hidden attribute is set on it
  - It lives in a system directory
  - Its permissions exclude your user
answer: 0
explanation: "That's the entire rule. \`ls\` skips dot-prefixed names unless you pass \`-a\`. It is a convention, not a security feature."
---
::

Next: creating, moving, and deleting things — including the one command that has no undo.
`,Ie=`You can now find your way around. This lesson is about changing things — making files and folders, copying them, moving them, and deleting them.

One of these operations is permanent. We'll get to that.

## Making things

\`touch\` creates an empty file (or, if it already exists, quietly updates its timestamp without touching the contents):

\`\`\`
touch notes.txt
\`\`\`

\`mkdir\` creates a directory:

\`\`\`
mkdir projects
\`\`\`

\`mkdir\` fails if the parent doesn't exist. \`mkdir -p\` creates the whole chain, and doesn't complain if some of it is already there:

\`\`\`
mkdir -p projects/website/src
\`\`\`

That \`-p\` is why you'll see \`mkdir -p\` in nearly every setup script ever written — it's safe to run twice, which is a property worth wanting in anything automated.

::terminal-teaser
---
lines:
  - cmd: mkdir -p site/css
  - cmd: touch site/index.html site/css/main.css
  - cmd: ls -R site
    out: "site:\\ncss  index.html\\n\\nsite/css:\\nmain.css"
---
::

Notice \`touch\` took two arguments and made two files. Most commands accept as many as you give them.

## Copying and moving

\`cp\` copies, \`mv\` moves. Both take the source first and the destination second:

\`\`\`
cp notes.txt notes-backup.txt
mv notes.txt archive/
\`\`\`

Two things trip people up:

**Copying a directory needs \`-r\`.** By default \`cp\` refuses to copy a folder, because copying a tree is a different and much larger operation than copying one file. \`-r\` (recursive) says "yes, the whole thing":

\`\`\`
cp -r site/ site-backup/
\`\`\`

**\`mv\` is also how you rename.** There is no \`rename\` command in the way you'd expect. Moving a file to a new name in the same directory *is* a rename:

\`\`\`
mv draft.txt final.txt
\`\`\`

That's not a hack — it's the same operation. A file's name is just an entry in a directory, so changing the name and changing the directory are the same kind of change.

::quiz
---
question: "You run \`mv report.txt reports/\`. The \`reports\` directory does not exist. What happens?"
options:
  - report.txt is renamed to a file called "reports"
  - The command fails and report.txt is untouched
  - A reports directory is created and the file moved into it
answer: 1
explanation: "The trailing slash is the safety net — it tells \`mv\` you mean a directory. Without the slash, \`mv report.txt reports\` would silently rename the file to \`reports\`, which is one of the classic ways to lose track of something. Get in the habit of the trailing slash."
---
::

## Deleting, and the thing nobody warns you about

\`rm\` removes files. \`rm -r\` removes directories and everything inside them.

\`\`\`
rm notes.txt
rm -r old-project/
\`\`\`

Here is the part that matters: **there is no trash can.** \`rm\` does not move things aside for later recovery. It unlinks them, and the space becomes available for reuse. On a normal filesystem with no backups, a deleted file is gone.

This is not a flaw. The command line assumes you meant what you said. But it means a typo in an \`rm\` command is in a different category of mistake than a typo anywhere else.

Two habits that will save you:

1. **Run \`ls\` with the same argument first.** If \`ls old-*\` lists what you expect, then \`rm -r old-*\` will delete what you expect. If it lists something surprising, you just avoided a bad afternoon.
2. **Use \`rm -i\` when deleting with wildcards.** It asks before each file. Tedious, and worth it when the pattern is doing the choosing rather than you.

<!-- slide -->

::deep-dive{title="About \`rm -rf /\` and why you'll see it in jokes"}
\`rm -rf /\` means "recursively, forcibly, delete everything starting from the root of the filesystem." It is the canonical example of a catastrophic command, and it shows up constantly in developer humour.

Modern \`rm\` implementations refuse this specific command unless you add \`--no-preserve-root\`, so the exact joke version is defanged. What is *not* defanged is the near-miss family — a stray space or an unset variable turning a targeted delete into a total one:

\`\`\`
rm -rf /home/you/projects /old      # the space before /old was a typo
rm -rf "$DIR"/                      # deletes / if DIR was never set
\`\`\`

That second one has taken down real production systems. It's the reason careful scripts check their variables before deleting anything.

The lesson isn't "be scared of \`rm\`". It's that \`rm\` does exactly what you typed, so what you typed had better be what you meant.
::

<!-- slide -->

::fill-blank
---
prompt: Copy the whole \`site\` directory to a new directory called \`site-backup\`.
answer:
  - cp -r site site-backup
  - cp -r site/ site-backup
  - cp -r site/ site-backup/
  - cp -r site site-backup/
hint: Copying a directory needs the recursive option.
placeholder: cp ...
explanation: Without \`-r\`, cp refuses and tells you it's omitting a directory.
---
::

::quiz
---
question: Which of these is the safest habit before running a delete with a wildcard?
options:
  - Run the same wildcard through \`ls\` first to see what it matches
  - Run it with sudo so it definitely works
  - Run it twice to be sure it took effect
answer: 0
explanation: "The wildcard is expanded by the shell before \`rm\` ever sees it, so \`ls\` with the same pattern shows you the exact list \`rm\` would receive. It's a free preview of a destructive command."
---
::

Next: actually reading what's inside these files.
`,qe=`Almost everything on a Linux system is configured with a text file and diagnosed with a text file. Reading them quickly is a genuine skill, and it starts with knowing which of four tools to reach for.

## Pick the right reader

**\`cat\`** dumps a whole file to the screen. Perfect for short files, terrible for long ones — a 5,000-line log will scroll past faster than you can read and leave you at the bottom.

\`\`\`
cat /etc/hostname
\`\`\`

<!-- slide -->

**\`less\`** opens a file in a pager you can scroll and search. This is the right default for anything you can't see in one screen.

\`\`\`
less /var/log/syslog
\`\`\`

Inside \`less\`: arrow keys or <kbd>Space</kbd> to scroll, \`/word\` to search forwards, \`n\` for the next match, \`G\` to jump to the end, \`g\` for the start, and **\`q\` to quit**. That last one matters — being stuck in a pager with no idea how to leave is a rite of passage nobody enjoys.

<!-- slide -->

**\`head\`** and **\`tail\`** show you the first or last ten lines:

\`\`\`
head -n 20 access.log     # first 20 lines
tail -n 50 access.log     # last 50 lines
\`\`\`

\`tail -f\` is the one you'll use most in real work. It shows the end of a file and then **keeps watching**, printing new lines as they're written:

\`\`\`
tail -f /var/log/nginx/error.log
\`\`\`

Leave that running in one window, reproduce your bug in another, and watch the error appear in real time. <kbd>Ctrl</kbd>+<kbd>C</kbd> stops it.

::terminal-teaser
---
lines:
  - cmd: head -n 3 /etc/passwd
    out: "root:x:0:0:root:/root:/bin/bash\\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\\nbin:x:2:2:bin:/bin:/usr/sbin/nologin"
  - cmd: tail -f /var/log/app.log
    out: "[09:14:22] server started\\n[09:14:31] GET /health 200\\n^C"
---
::

<!-- slide -->

::quiz
---
question: You need to watch a log file as new entries arrive while you reproduce a bug. Which command?
options:
  - tail -f logfile
  - cat logfile
  - head -f logfile
  - less logfile
answer: 0
explanation: "\`-f\` means follow. \`cat\` prints once and exits, \`less\` shows a snapshot you'd have to keep refreshing, and \`head -f\` isn't a thing."
---
::

## Editing without leaving the terminal

Sooner or later you'll need to change a config file on a machine that has no GUI. You have two realistic options.

### nano — the one to learn first

\`\`\`
nano config.txt
\`\`\`

\`nano\` behaves the way you expect a text editor to behave. Type to insert, arrow keys to move. The commands are listed along the bottom of the screen, where \`^\` means <kbd>Ctrl</kbd>:

- <kbd>Ctrl</kbd>+<kbd>O</kbd> — write out (save), then <kbd>Enter</kbd> to confirm the filename
- <kbd>Ctrl</kbd>+<kbd>X</kbd> — exit
- <kbd>Ctrl</kbd>+<kbd>K</kbd> — cut the current line

If nano is available, use it. There is no prize for suffering.

### vim — the one you'll eventually meet anyway

\`vim\` is on essentially every Unix machine ever built, including minimal containers and rescue images where nano isn't installed. You don't need to learn vim properly today. You need to not be trapped by it.

The one idea that makes vim make sense: it has **modes**. When it opens you are in *normal* mode, where keys are commands, not text. This is why typing "hello" into a fresh vim does something alarming instead of writing "hello".

The survival sequence:

1. Press <kbd>i</kbd> to enter **insert** mode. Now typing works normally.
2. Press <kbd>Esc</kbd> to return to **normal** mode.
3. Type \`:wq\` and <kbd>Enter</kbd> to write and quit.
4. Or type \`:q!\` and <kbd>Enter</kbd> to quit and throw away every change.

That's it. \`Esc\`, then \`:wq\` to save or \`:q!\` to bail. Those four keystrokes get you out of any vim session you didn't mean to start.

<!-- slide -->

::deep-dive{title="Why does \`:q!\` need the exclamation mark?"}
Because vim refuses to discard unsaved work quietly.

Plain \`:q\` means "quit". If the file has unsaved changes, vim declines and warns you. The \`!\` means "I know, do it anyway" — it's the same *force* idea as \`-f\` in \`rm -rf\` or \`cp -f\`.

The pattern shows up all over Unix: the safe version is the default, and you add something explicit to override the safety. Once you notice it, \`!\` and \`-f\` stop looking arbitrary.
::

::fill-blank
---
prompt: Show the last 100 lines of a file called \`access.log\`.
answer:
  - tail -n 100 access.log
  - tail -100 access.log
  - tail --lines=100 access.log
hint: The command is \`tail\`, and the option asks for a number of lines.
placeholder: tail ...
explanation: "\`tail -n 100\` is the portable spelling; the shorter \`tail -100\` works on most systems too."
---
::

::quiz
---
question: You've opened vim by accident and typed some junk. How do you leave without saving?
options:
  - Press Esc, then type :q! and Enter
  - Press Ctrl+C
  - Press Ctrl+X
  - Type quit and press Enter
answer: 0
explanation: "Esc gets you out of insert mode into normal mode, where \`:\` starts a command. \`q!\` quits and discards changes. Ctrl+C won't do it, and Ctrl+X is nano's key."
---
::

Next: permissions — the reason things say "Permission denied", and what \`rwx\` actually means.
`,Ce=`"Permission denied" is the error every beginner hits and most people learn to route around by typing \`sudo\` until it works. That habit will eventually cost you something. Permissions are a small, entirely learnable system — about fifteen minutes of theory that pays off forever.

## Reading the output of \`ls -l\`

Run \`ls -l\` and every line starts with something like \`-rw-r--r--\`. That string is the whole permission model:

\`\`\`
-rw-r--r--  1  nizar  staff  1024  Aug 19 09:14  notes.txt
│└┬┘└┬┘└┬┘     │      │
│ │  │  │      │      └── group that owns it
│ │  │  │      └───────── user that owns it
│ │  │  └── others: everyone else
│ │  └───── group members
│ └──────── owner
└────────── type: - is a file, d is a directory, l is a link
\`\`\`

After the type character, there are **three groups of three**. Each group is read-write-execute (\`rwx\`) for one class of user: the **owner**, the **group**, and **everyone else**. A dash means that permission is absent.

So \`-rw-r--r--\` reads as: it's a regular file; the owner can read and write it; the group can only read it; everyone else can only read it. Nobody can execute it.

::quiz
---
question: "A file shows \`-rwxr-x---\`. Who can execute it?"
options:
  - The owner and members of the group
  - Only the owner
  - Everyone
  - Nobody, because there is no execute bit set
answer: 0
explanation: "Owner has rwx, group has r-x (read and execute, no write), and others have --- (nothing at all). So owner and group can run it; everyone else can't even read it."
---
::

## What the bits mean for directories

This is where the model surprises people, because \`rwx\` means something different on a directory:

- **\`r\`** — you can list the contents (\`ls\` works)
- **\`w\`** — you can create and delete entries inside it
- **\`x\`** — you can *enter* it and access things through it (\`cd\` works)

The important consequence: \`w\` on a directory lets you delete files inside it **even if you can't write to those files**. Deleting a file is modifying its directory, not modifying the file. That's how a read-only file in a writable folder can still disappear.

And a directory without \`x\` is effectively sealed — you can't \`cd\` into it or reach anything inside, even if you know the exact path.

## The numbers

You'll see permissions written as three digits: \`644\`, \`755\`, \`600\`. Each digit is one class (owner, group, others), and each is a sum:

- read = **4**
- write = **2**
- execute = **1**

Add them for each class:

- \`7\` = 4+2+1 = \`rwx\`
- \`6\` = 4+2 = \`rw-\`
- \`5\` = 4+1 = \`r-x\`
- \`4\` = \`r--\`
- \`0\` = \`---\`

Which makes the two you'll see constantly decode cleanly:

- **\`644\`** = \`rw-r--r--\` — owner edits, everyone reads. The normal state of a document or config file.
- **\`755\`** = \`rwxr-xr-x\` — owner edits, everyone reads and runs. The normal state of a program or a directory.

::fill-blank
---
prompt: What three-digit number means "owner can read and write, nobody else can do anything"?
answer:
  - 600
  - "600"
hint: Read is 4 and write is 2, and the other two classes get nothing.
placeholder: e.g. 644
explanation: "600 is \`rw-------\`. It's what you want on private keys and files holding secrets — and ssh will actually refuse to use a key that's more permissive than this."
---
::

## Changing them

\`chmod\` changes permissions. It takes numbers:

\`\`\`
chmod 644 notes.txt
chmod 755 deploy.sh
\`\`\`

…or symbols, which are easier when you want to change one thing without recalculating the whole set:

\`\`\`
chmod +x deploy.sh      # add execute for everyone
chmod u+x deploy.sh     # add execute for the user (owner) only
chmod go-w notes.txt    # remove write from group and others
\`\`\`

\`u\` is user/owner, \`g\` is group, \`o\` is others, \`a\` is all. \`+\` adds, \`-\` removes, \`=\` sets exactly.

\`chown\` changes ownership, and generally needs \`sudo\` because giving your files away (or taking someone else's) is a privileged act:

\`\`\`
sudo chown nizar:staff notes.txt
\`\`\`

::deep-dive{title="Why a script you just wrote won't run"}
You write \`deploy.sh\`, type \`./deploy.sh\`, and get "Permission denied".

Nothing is broken. Files are created without the execute bit — a sensible default, since most files aren't programs and you don't want anything that lands on your disk to be runnable. Your script is currently \`644\`, and running it requires \`x\`.

\`\`\`
chmod +x deploy.sh
./deploy.sh
\`\`\`

This is also why downloaded binaries and installers so often come with a \`chmod +x\` step in their instructions.

Note the \`./\` as well. Remember \`PATH\` from the first lesson — the shell only searches those directories, and your current directory isn't one of them. \`./deploy.sh\` is you giving an explicit path instead of asking for a search.
::

## On \`sudo\`

\`sudo\` runs a single command as the superuser, which bypasses permission checks entirely. It exists for the cases that genuinely need it — installing packages, editing \`/etc\`, managing services.

Reaching for it whenever something is denied is a bad trade. It hides the actual problem (often a file owned by the wrong user, which stays wrong), and it turns small mistakes into system-wide ones — \`rm -rf\` as your own user can only destroy your own files, and the same command under \`sudo\` has no such limit.

When you hit "Permission denied", the useful first move is \`ls -l\` on the thing in question. Nine times out of ten the answer is visible immediately.

::quiz
---
question: Why can you sometimes delete a file you have no write permission on?
options:
  - Because deleting is controlled by write permission on the containing directory, not the file
  - Because the owner always keeps delete rights
  - Because read permission implies delete
answer: 0
explanation: "Deleting removes the file's entry from its directory — that's a modification of the directory. If you can write to the directory, you can remove entries from it regardless of the files' own permissions."
---
::

Next: processes — finding, watching, and stopping the things that are running.
`,Ae=`Every running program on a Linux machine is a **process**, and every process has a number — its PID. Almost all operational work comes down to three questions: what's running, what is it doing, and how do I make it stop.

## Seeing what's running

\`ps\` lists processes. On its own it shows only yours, in the current terminal, which is rarely what you want. The incantation people actually use is:

\`\`\`
ps aux
\`\`\`

Which reads as: **a**ll users' processes, **u**ser-readable format, including processes with no controlling terminal (**x**) — that last one matters because it's how background services show up.

\`\`\`
USER   PID  %CPU  %MEM  COMMAND
root     1   0.0   0.1  /sbin/init
you   2481   0.3   2.1  /usr/bin/node server.js
you   3120  98.7   0.4  ./stuck-script.sh
\`\`\`

PID 1 is always the init system — the first process started at boot, and the ancestor of everything else.

\`top\` shows the same information but live, sorted by CPU use, refreshing every second or two. \`q\` quits it. If \`htop\` is installed, it's the nicer version — colour, scrolling, and you can kill processes from inside it.

::terminal-teaser
---
lines:
  - cmd: ps aux | grep node
    out: "you   2481  0.3  2.1  /usr/bin/node server.js"
  - cmd: kill 2481
  - cmd: ps aux | grep node
    out: ""
---
::

That first command is a preview of the next lesson — \`ps aux\` produced a long list, and \`grep node\` kept only the lines mentioning node. Combining two small tools like that is the whole point of the command line.

## Stopping things

\`kill\` sends a **signal** to a process. Despite the name, it's a general "send a message" command, and the default message is a polite one:

\`\`\`
kill 2481
\`\`\`

That sends \`SIGTERM\` — *please shut down*. A well-behaved program catches it, finishes what it's writing, closes its files, and exits cleanly. This is what you want almost always.

When a process ignores that — genuinely hung, or stuck in a loop that never checks for signals — you escalate:

\`\`\`
kill -9 2481
\`\`\`

\`-9\` is \`SIGKILL\`, and it's different in kind: the process never sees it. The kernel simply stops scheduling it and reclaims its memory. There's no cleanup, no flushing buffers, no closing files. A database killed this way can leave a corrupted file behind.

So the rule is: **\`kill\` first, \`kill -9\` only when it doesn't work.** Reaching for \`-9\` reflexively is the same mistake as reaching for \`sudo\` reflexively.

<!-- slide -->

::quiz
---
question: Why should \`kill -9\` be a last resort rather than a first move?
options:
  - The process is terminated immediately with no chance to save state or clean up
  - It requires root permissions that normal users don't have
  - It kills every process owned by the same user
answer: 0
explanation: "SIGKILL can't be caught or handled — the kernel just stops the process. Anything half-written stays half-written. Plain \`kill\` gives the program a chance to exit properly, which is why it's the default."
---
::

::fill-blank
---
prompt: Send the default termination signal to the process with PID 4102.
answer:
  - kill 4102
  - kill -15 4102
  - kill -TERM 4102
  - kill -SIGTERM 4102
hint: The plain form of the command is the polite one — no options needed.
placeholder: kill ...
explanation: "Plain \`kill\` sends signal 15 (SIGTERM), so \`kill 4102\` and \`kill -15 4102\` are identical."
---
::

## Foreground, background, and the two Ctrl keys

When you run something, it takes over your terminal — you don't get a prompt back until it finishes. That's the **foreground**.

Adding \`&\` starts it in the **background** instead, and hands you the prompt immediately:

\`\`\`
./long-running-job.sh &
\`\`\`

Two keyboard shortcuts control this, and confusing them is common:

- <kbd>Ctrl</kbd>+<kbd>C</kbd> — **stop** the foreground process. This sends SIGINT, asking it to quit.
- <kbd>Ctrl</kbd>+<kbd>Z</kbd> — **suspend** it. The process is paused, not stopped, and is still sitting there consuming memory.

After <kbd>Ctrl</kbd>+<kbd>Z</kbd>, three commands manage what you've suspended:

\`\`\`
jobs     # list suspended and background jobs in this shell
fg       # bring the most recent one back to the foreground
bg       # let it continue, but in the background
\`\`\`

This is worth knowing because it explains a common confusion: you press <kbd>Ctrl</kbd>+<kbd>Z</kbd> expecting to quit something, get your prompt back, assume it's gone — and it's still running, or rather still *paused*, until you close the terminal.

<!-- slide -->

::deep-dive{title="Finding a PID when you only know the name"}
You rarely know a PID off the top of your head. Two ways to find one:

\`\`\`
pgrep -f "server.js"        # print PIDs matching a pattern
ps aux | grep server.js     # the older, more manual version
\`\`\`

And you can skip the lookup entirely with \`pkill\`, which matches by name and signals everything that matches:

\`\`\`
pkill -f "server.js"
\`\`\`

Be careful with \`pkill\` and broad patterns — it will happily match more than you intended. As with \`rm\`, run the \`pgrep\` version first to see the list, *then* signal it.
::

::quiz
---
question: You press Ctrl+Z on a running command and get your prompt back. What happened to the process?
options:
  - It's suspended — still in memory, paused, and can be resumed with fg
  - It was terminated cleanly
  - It moved to the background and is still doing work
answer: 0
explanation: "Ctrl+Z suspends rather than stops. \`jobs\` will show it, \`fg\` resumes it in the foreground, and \`bg\` lets it carry on in the background. Ctrl+C is the one that actually asks it to quit."
---
::

Next: the last lesson, and the idea that makes everything so far worth learning.
`,je=`In the first lesson I said the shell lets you combine small programs in ways nobody anticipated. This is that lesson.

Everything so far has been individual commands. What makes the command line genuinely powerful — more powerful than any GUI, for a large class of problems — is that its programs are designed to be connected.

## Three streams

Every process starts with three channels already open:

- **stdin** (0) — where input comes from. Usually your keyboard.
- **stdout** (1) — where normal output goes. Usually your screen.
- **stderr** (2) — where error messages go. Also usually your screen.

The screen is just the *default*. Every one of these can be pointed somewhere else, and that's all redirection is.

The split between stdout and stderr is deliberate and useful: it means you can capture a program's results while still seeing its complaints, because they travel on separate channels even though they land in the same place by default.

## Redirecting to files

\`\`\`
ls > files.txt          # stdout into a file, replacing its contents
ls >> files.txt         # stdout appended to the end instead
\`\`\`

The difference between \`>\` and \`>>\` is worth burning in: **\`>\` truncates the file first.** Pointing \`>\` at something that already has contents destroys them, instantly, with no warning. It's the second-most common way people lose work at a terminal, after \`rm\`.

Errors need their own redirect, because they're on channel 2:

\`\`\`
./script.sh 2> errors.txt         # errors to a file, output still on screen
./script.sh > out.txt 2>&1        # both into one file
./script.sh &> everything.txt     # shorthand for the same thing (bash)
\`\`\`

That \`2>&1\` reads as "send channel 2 to wherever channel 1 is currently going". It looks cryptic and it's worth recognising, because it appears in nearly every cron job and CI script you'll ever read.

And input can come from a file instead of the keyboard:

\`\`\`
sort < names.txt
\`\`\`

::quiz
---
question: "You run \`echo hello > notes.txt\`, but notes.txt already contained a week of work. What happened to it?"
options:
  - It was truncated — the old contents are gone and the file now holds one line
  - The new line was added to the end
  - The command failed because the file already existed
answer: 0
explanation: "\`>\` truncates before writing. \`>>\` is the one that appends. This is why the habit of typing \`>>\` unless you specifically mean to replace is worth building."
---
::

## The pipe

\`>\` sends output to a file. The pipe, \`|\`, sends it to **another program's input**:

\`\`\`
ps aux | grep node
\`\`\`

\`ps aux\` writes a long list to stdout. Instead of your screen, that list becomes \`grep\`'s stdin. \`grep\` reads it, keeps only lines matching "node", and writes those to *its* stdout — which is your screen.

Neither program knows the other exists. \`ps\` doesn't know it's being filtered; \`grep\` doesn't know where the text came from. That independence is the whole design, and it's why pipes compose without limit:

\`\`\`
cat access.log | grep " 500 " | wc -l
\`\`\`

Read left to right: take the log, keep only lines containing a 500 status, count them. Three simple tools answering a question none of them was written for.

::terminal-teaser
---
lines:
  - cmd: "cat access.log | grep \\" 500 \\" | wc -l"
    out: "27"
  - cmd: "cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -3"
    out: "   412 10.0.0.7\\n   288 10.0.0.31\\n   106 10.0.0.4"
---
::

That second one finds the three IP addresses hitting your server hardest: take each line's first field, sort them, count each unique value, sort those counts numerically in reverse, show the top three. Six tools, one line, no script, no program written.

## The pieces worth knowing

A small vocabulary covers most real pipelines:

- \`grep pattern\` — keep matching lines (\`-v\` inverts it, \`-i\` ignores case, \`-c\` counts)
- \`wc -l\` — count lines
- \`sort\` — sort lines (\`-n\` numerically, \`-r\` reversed)
- \`uniq -c\` — collapse adjacent duplicates and count them (needs sorted input)
- \`head\` / \`tail\` — first or last N lines
- \`cut -d, -f2\` — pull out a field by delimiter
- \`awk '{print $1}'\` — pull out a column by position

<!-- slide -->

::fill-blank
---
prompt: Count how many lines in \`access.log\` contain the word "error".
answer:
  - grep error access.log | wc -l
  - grep -c error access.log
  - cat access.log | grep error | wc -l
  - grep "error" access.log | wc -l
hint: Filter the file with grep, then count the surviving lines.
placeholder: grep ...
explanation: "\`grep error access.log | wc -l\` is the classic pipeline. \`grep -c error access.log\` does it in one step — both are right, and knowing the pipeline version matters more because it generalises."
---
::

<!-- slide -->

::deep-dive{title="Why this design won"}
In 1978 Doug McIlroy wrote down the Unix philosophy as: write programs that do one thing well, and write programs to work together on text streams.

The bet was that a small set of sharp tools plus a way to connect them beats a large set of feature-rich ones. Nearly fifty years later that bet keeps paying: the pipeline above analysing a web server log was composed from programs written decades before web servers existed, by people who had no idea what they'd eventually be used for.

That's the real reason to learn this. Not because the commands are hard — they aren't — but because once you think in pipelines, a whole class of problems stops requiring you to write a program at all.
::

::quiz
---
question: "In \`ps aux | grep node\`, what is grep reading from?"
options:
  - The stdout of \`ps aux\`, connected to grep's stdin by the pipe
  - A temporary file that ps wrote first
  - The terminal, after ps finished printing to it
answer: 0
explanation: "The pipe connects one program's stdout directly to the next one's stdin — no temp file, and the data flows while both are running. Neither program knows anything about the other."
---
::

## Where this goes next

You now have the model the rest of Linux is built on — a filesystem tree, permissions, processes, and streams you can wire together.

The natural next step is to stop typing these one at a time and start saving them: shell scripts, variables, loops, and conditionals. After that, containers — because a Docker container is, at bottom, a process with its own view of the filesystem, and everything in this course applies directly.

That's what the next courses cover.
`,$e=p=>{const d=String(p||"").replace(/\r\n/g,`
`).split(`
`),l=[];let r=[],n=!1,o=0;const x=()=>{const g=r.join(`
`).trim();g&&l.push(g),r=[]};for(const g of d){const k=g.trim();if(k.startsWith("```")){n=!n,r.push(g);continue}!n&&o===0&&/^::\w[\w-]*/.test(k)&&x(),n||(/^::\w[\w-]*/.test(k)?o+=1:k==="::"&&o>0&&(o-=1));const C=!n&&o===0;if(C&&/^<!--\s*slide\s*-->$/.test(k)){x();continue}if(C&&/^#{2,3} /.test(k)){x(),r.push(g);continue}r.push(g)}return x(),l},Ee={class:"layout-wrapper pt-20"},Le={class:"flex gap-8 xl:gap-12 items-start"},Ne={class:"mt-4 space-y-1"},Pe={class:"flex-grow text-[0.95rem] leading-snug"},Se={class:"flex-1 min-w-0 py-8"},We={class:"flex items-end justify-between gap-6 flex-wrap"},Re={class:"font-serif text-4xl md:text-5xl font-bold leading-none"},ze={class:"flex items-center gap-3 shrink-0"},De={class:"font-mono text-sm opacity-40"},Me={class:"flex gap-1.5 mt-6"},Ye=["aria-label","onClick"],Be={class:"flex items-center justify-between gap-4 mt-6"},Ue=["disabled"],T="https://theonlyengineer.com",Ve={__name:"[lesson]",setup(p){const d=te(),l=se(),r=oe(),n=f(()=>r.getCourse(d.params.course)),o=f(()=>n.value?r.getLesson(d.params.course,d.params.lesson):null);if(!n.value||!o.value)throw ie({statusCode:404,statusMessage:"Lesson not found",fatal:!0});const x=f(()=>n.value.lessons.findIndex(i=>i.slug===o.value.slug)),g=f(()=>n.value.lessons[x.value+1]||null),k=Object.assign({"/content/courses/linux-basics/01-what-is-a-shell.md":Te,"/content/courses/linux-basics/02-navigating-the-filesystem.md":_e,"/content/courses/linux-basics/03-files-and-directories.md":Ie,"/content/courses/linux-basics/04-reading-and-editing-files.md":qe,"/content/courses/linux-basics/05-permissions.md":Ce,"/content/courses/linux-basics/06-processes.md":Ae,"/content/courses/linux-basics/07-pipes-and-redirection.md":je}),C=f(()=>k[`/content/courses/${n.value.slug}/${o.value.src}`]),y=f(()=>$e(C.value)),a=D(0),N=D(null),I=D(!1),P=i=>{const s=Number.parseInt(i,10);return Number.isFinite(s)?Math.min(Math.max(s-1,0),y.value.length-1):0},V=f(()=>r.percentComplete(n.value.slug)),B=f(()=>r.isComplete(n.value.slug,o.value.slug)),S=()=>{B.value||(r.completeLesson(n.value.slug,o.value.slug),pe("course_lesson_complete",{course:n.value.slug,lesson:o.value.slug}))},X=()=>{if(!N.value)return;const i=N.value.getBoundingClientRect().top+window.scrollY-140;window.scrollY>i&&window.scrollTo({top:i,behavior:"smooth"})},W=i=>{a.value=Math.min(Math.max(i,0),y.value.length-1),de(X)},U=()=>{a.value<y.value.length-1&&W(a.value+1)},O=()=>{a.value>0&&W(a.value-1)};$(a,i=>{P(d.query.slide)!==i&&l.replace({query:{...d.query,slide:i+1}})}),$(()=>d.query.slide,i=>{const s=P(i);s!==a.value&&(a.value=s)}),$(()=>d.params.lesson,()=>{a.value=0,I.value=!1}),$(a,i=>{i===y.value.length-1&&S()});const F=i=>{var j,_;const s=(j=i.target)==null?void 0:j.tagName;s==="INPUT"||s==="TEXTAREA"||(_=i.target)!=null&&_.isContentEditable||(i.key==="ArrowRight"&&U(),i.key==="ArrowLeft"&&O())};ae(()=>{const i=P(d.query.slide);i!==a.value&&(a.value=i),window.addEventListener("keydown",F)}),re(()=>window.removeEventListener("keydown",F));const R=f(()=>`${o.value.title} | ${n.value.title} | Nizar`),A=f(()=>`${T}/courses/${n.value.slug}/${o.value.slug}`),G=`${T}/img/social-computer.webp`;return le({title:R,description:()=>o.value.summary,ogTitle:R,ogType:"article",ogDescription:()=>o.value.summary,ogImage:G,ogUrl:A,twitterTitle:R,twitterDescription:()=>o.value.summary,twitterImage:G,twitterCard:"summary_large_image"}),he({link:[{rel:"canonical",href:A}],script:[{type:"application/ld+json",innerHTML:JSON.stringify({"@context":"https://schema.org","@type":"LearningResource",name:o.value.title,description:o.value.summary,url:A.value,isPartOf:{"@type":"Course",name:n.value.title,url:`${T}/courses/${n.value.slug}`},author:{"@type":"Person",name:"Nizar",url:T}})},{type:"application/ld+json",innerHTML:JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:T},{"@type":"ListItem",position:2,name:"Courses",item:`${T}/courses`},{"@type":"ListItem",position:3,name:n.value.title,item:`${T}/courses/${n.value.slug}`},{"@type":"ListItem",position:4,name:o.value.title,item:A.value}]})}]}),(i,s)=>{const j=xe,_=Z,z=K,J=me;return h(),u("div",null,[w(j,{course:e(n),"lesson-index":e(x),percent:e(V),onToggleContents:s[0]||(s[0]=c=>I.value=!e(I))},null,8,["course","lesson-index","percent"]),t("div",Ee,[t("div",Le,[t("aside",{class:q(["w-full lg:w-[320px] shrink-0 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto py-8",e(I)?"block":"hidden lg:block"])},[s[3]||(s[3]=t("span",{class:"text-xs uppercase tracking-[0.15em] opacity-40"},"Contents",-1)),t("ol",Ne,[(h(!0),u(M,null,Y(e(n).lessons,(c,b)=>(h(),u("li",{key:c.slug},[w(z,{to:`/courses/${e(n).slug}/${c.slug}`,class:q(["flex gap-4 items-baseline px-4 py-3.5 rounded-xl transition-colors duration-150",c.slug===e(o).slug?"bg-black text-white":"hover:bg-black/[0.05]"]),onClick:s[1]||(s[1]=Q=>I.value=!1)},{default:m(()=>[t("span",{class:q(["font-mono text-sm shrink-0 w-6",c.slug===e(o).slug?"opacity-60":"opacity-35"])},v(String(b+1).padStart(2,"0")),3),t("span",Pe,v(c.title),1),w(_,null,{default:m(()=>[e(r).isComplete(e(n).slug,c.slug)?(h(),u("span",{key:0,class:q(["shrink-0 text-sm",c.slug===e(o).slug?"text-white":"text-c1"])}," ✓ ",2)):E("",!0)]),_:2},1024)]),_:2},1032,["to","class"])]))),128))])],2),t("div",Se,[t("div",We,[t("h1",Re,v(e(o).title),1),t("div",ze,[w(_,null,{default:m(()=>[e(B)?(h(),u("button",{key:0,class:"inline-flex items-center gap-1.5 rounded-full bg-c1/[0.12] text-c1 pl-2.5 pr-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] hover:bg-c1 hover:text-white transition-colors duration-150",title:"Mark this lesson as not complete",onClick:s[2]||(s[2]=c=>e(r).uncompleteLesson(e(n).slug,e(o).slug))},s[4]||(s[4]=[t("span",{class:"text-sm leading-none"},"✓",-1),L(" Completed ")]))):E("",!0)]),_:1}),t("span",De,v(e(a)+1)+" / "+v(e(y).length),1)])]),t("div",Me,[(h(!0),u(M,null,Y(e(y),(c,b)=>(h(),u("button",{key:b,class:q(["h-1 flex-1 rounded-full transition-colors duration-200",b<=e(a)?"bg-black":"bg-black/10 hover:bg-black/25"]),"aria-label":`Go to slide ${b+1}`,onClick:Q=>W(b)},null,10,Ye))),128))]),t("div",{ref_key:"slideEl",ref:N,class:"rounded-2xl border border-black/[0.09] bg-white/50 mt-6 px-6 py-10 md:px-12 md:py-14 min-h-[46vh] flex flex-col justify-center"},[(h(!0),u(M,null,Y(e(y),(c,b)=>ce((h(),u("div",{key:b,class:"lesson-canvas"},[w(J,{value:c,tag:!1},null,8,["value"])])),[[ue,b===e(a)]])),128))],512),t("div",Be,[t("button",{class:"px-6 py-3 rounded-full border border-black/15 font-medium transition-colors duration-150 disabled:opacity-25 disabled:cursor-not-allowed enabled:hover:bg-black enabled:hover:text-white enabled:hover:border-black",disabled:e(a)===0,onClick:O}," ← Back ",8,Ue),s[8]||(s[8]=t("span",{class:"text-xs uppercase tracking-[0.15em] opacity-30 hidden sm:block"}," Use ← → keys ",-1)),e(a)<e(y).length-1?(h(),u("button",{key:0,class:"px-7 py-3 rounded-full bg-black text-white font-medium hover:bg-c1 transition-colors duration-150",onClick:U}," Next → ")):E("",!0),w(_,null,{fallback:m(()=>s[7]||(s[7]=[t("span",{class:"px-7 py-3 rounded-full bg-black text-white font-medium"}," Finish → ",-1)])),default:m(()=>[e(a)===e(y).length-1&&e(g)?(h(),H(z,{key:0,to:`/courses/${e(n).slug}/${e(g).slug}`,class:"px-7 py-3 rounded-full bg-black text-white font-medium hover:bg-c1 transition-colors duration-150",onClick:S},{default:m(()=>s[5]||(s[5]=[L(" Finish — next lesson → ")])),_:1},8,["to"])):e(a)===e(y).length-1?(h(),H(z,{key:1,to:`/courses/${e(n).slug}`,class:"px-7 py-3 rounded-full bg-black text-white font-medium hover:bg-c1 transition-colors duration-150",onClick:S},{default:m(()=>s[6]||(s[6]=[L(" Finish course → ")])),_:1},8,["to"])):E("",!0)]),_:1})])])])])])}}};export{Ve as default};
