// ssh-portfolio — SSH TUI for pratikwayal.vercel.app
//
// Build:  go build -o ssh-portfolio .
// Run:    ./ssh-portfolio                     (port 2222, host key ./host_key)
// Env:    SSH_PORT, SSH_HOST_KEY
//
// Connect: ssh pratik@<host> -p 2222
package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"strings"

	"github.com/charmbracelet/ssh"
	"github.com/charmbracelet/wish"
	lm "github.com/charmbracelet/wish/logging"
)

const (
	HOST = "pratikwayal"
	PWD  = "~/"
)

var (
	github   = "github.com/pratikwayal01"
	linkedin = "linkedin.com/in/pratikwayal"
	twitter  = "x.com/pratik_2520"
	email    = "pratikwayal01@gmail.com"
	site     = "pratikwayal.vercel.app"
	resume   = "https://drive.google.com/file/d/1FympfGyzprgnOhcsv5kXNQkfWYSjYP4d/view"
)

// ─── content ────────────────────────────────────────────────────────────────

const banner = "\x1b[32m" + `
      ██████╗ ██████╗  █████╗ ████████╗██╗██╗
      ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║██║
      ██████╔╝██████╔╝███████║   ██║   ██║██║
      ██╔═══╝ ██╔══██╗██╔══██║   ██║   ██║██║
      ██║     ██║  ██║██║  ██║   ██║   ██║██║
      ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝
` + "\x1b[0m" + `       pratik wayal — devops engineer
  type 'help' to get started`

var aboutText = strings.Join([]string{
	"",
	"  Hi, I'm Pratik Wayal — DevOps engineer from Pune, India.",
	"  I build infrastructure, automation and robots.",
	"",
	"  Skills: Linux, AWS, Kubernetes, Docker, CI/CD, Python,",
	"          ROS, OpenCV, Networking, GitOps (ArgoCD)",
	"  Interests: autonomous systems, breaking things in staging",
	"",
}, "\n")

var projectsText = strings.Join([]string{
	"",
	"  1. Autonomous Robot for Robocon 2024",
	"     ROS + OpenCV + Python — vision & path planning for DD Robocon",
	"     github.com/pratikwayal01/robocon-2024",
	"",
	"  2. Image Forgery Detection (CNN)",
	"     Flask + Docker + GH Actions + AWS EC2 + NGINX",
	"     github.com/pratikwayal01/Image-Forgery-Detection-CNN-Updated",
	"",
	"  3. ParkCircle — Smart Parking Detection",
	"     TensorFlow + OpenCV, real-time occupancy from video",
	"     github.com/pratikwayal01/ParkCircle",
	"",
	"  4. This Portfolio (terminal v2)",
	"     React + TypeScript + Tailwind + Framer Motion",
	"     github.com/pratikwayal01/Pratiks-Portfolio",
	"",
	"  5. Plant Health Monitoring",
	"     Flask + IoT sensors + weather APIs + Chart.js",
	"     github.com/pratikwayal01/plant_health_monitoring_system",
	"",
}, "\n")

var helpText = strings.Join([]string{
	"  available commands",
	"  ───────────────────────────────",
	"  help                  show this help",
	"  whoami                print identity",
	"  about                 about me",
	"  skills                skill set",
	"  projects              project list",
	"  contact               contact info",
	"  resume                open resume link",
	"  github                github profile",
	"  linkedin              linkedin profile",
	"  twitter               x/twitter profile",
	"  neofetch              system info",
	"  clear                 clear screen",
	"  echo <text>           print text",
	"  sudo rm -rf /         do not run this",
	"  exit / logout         leave",
	"",
}, "\n")

var skillsText = strings.Join([]string{
	"",
	"  DevOps/Cloud: AWS (EKS, ECS, Lambda, CloudFront), Kubernetes, Docker,",
	"                 Terraform, GitHub Actions, ArgoCD, Helm, Nginx, Linux",
	"  Languages:     Python, C++, Bash, JavaScript/TypeScript, Go",
	"  Robotics:      ROS, OpenCV, SLAM, path planning",
	"  Monitoring:    Prometheus, Grafana, OpenTelemetry",
	"",
}, "\n")

var neofetchText = strings.Join([]string{
	"",
	"        #####      pratik@pratikwayal",
	"       #######     ──────────────────",
	"       ##O#O##     OS:     DevOps Engineer",
	"       #######     Host:   Pratik Wayal, Pune IN",
	"      ##########   Kernel: 5.x (opinions)",
	"      ##########   Uptime: ∞",
	"      ##########   Shell:  bash, zsh, fish",
	"      ##########   Memory: ∞",
	"",
}, "\n")

// ─── shell ──────────────────────────────────────────────────────────────────

func handleInput(s ssh.Session) {
	r := bufio.NewReader(s)
	wish.Println(s, banner)
	for {
		line, err := r.ReadString('\n')
		if err != nil {
			return
		}
		input := strings.TrimSpace(line)
		if input == "clear" {
			wish.WriteString(s, "\x1b[2J\x1b[H")
			continue
		}
		out := runCommand(input)
		if out == "__EXIT__" {
			s.Exit(0)
			return
		}
		if out != "" {
			wish.WriteString(s, out)
		}
	}
}

func runCommand(input string) string {
	// multi-word commands first
	switch input {
	case "sudo rm -rf /", "sudo rm -rf /*":
		return "  nice try. /bin/rm: Permission denied — you need root for that, and root says no.\n"
	case "open github", "ssh github":
		return "  opening github... https://" + github + "\n"
	case "open linkedin":
		return "  opening linkedin... https://" + linkedin + "\n"
	case "open twitter":
		return "  opening x... https://" + twitter + "\n"
	case "open resume":
		return "  opening resume... " + resume + "\n"
	}

	fields := strings.Fields(input)
	if len(fields) == 0 {
		return ""
	}
	cmd, args := fields[0], fields[1:]

	switch cmd {
	case "help", "?":
		return helpText
	case "about":
		return aboutText
	case "skills":
		return skillsText
	case "projects":
		return projectsText
	case "contact":
		return fmt.Sprintf("\n  email:    %s\n  github:   %s\n  linkedin: %s\n  twitter:  %s\n  site:     %s\n", email, github, linkedin, twitter, site)
	case "resume":
		return "  opening resume... " + resume + "\n"
	case "github":
		return "  opening github... https://" + github + "\n"
	case "linkedin":
		return "  opening linkedin... https://" + linkedin + "\n"
	case "twitter", "x":
		return "  opening x... https://" + twitter + "\n"
	case "whoami":
		return "  pratik\n"
	case "pwd":
		return "  " + PWD + "\n"
	case "uname", "uname -a":
		return "  Linux pratikwayal 6.8.0-aws x86_64 GNU/Linux\n"
	case "ls", "ls -la":
		return "  about.md  skills.md  projects.md  contact.md  resume.pdf\n"
	case "neofetch":
		return neofetchText
	case "echo":
		return "  " + strings.Join(args, " ") + "\n"
	case "exit", "logout", "quit":
		return "__EXIT__"
	case "sudo":
		return "  sudo: " + strings.Join(args, " ") + ": command not found\n"
	default:
		return "  bash: " + cmd + ": command not found — try 'help'\n"
	}
}

// ─── server ─────────────────────────────────────────────────────────────────

func sessionMiddleware() wish.Middleware {
	return func(next ssh.Handler) ssh.Handler {
		return func(s ssh.Session) {
			wish.Println(s, "\n  welcome to "+HOST+" — terminal version of "+site+"\n")
			if cmd := s.RawCommand(); cmd != "" {
				// one-shot: ssh pratik@host "whoami"
				out := runCommand(strings.TrimSpace(cmd))
				if out != "" && out != "__EXIT__" {
					wish.WriteString(s, out)
				}
				s.Exit(0)
				next(s)
				return
			}
			handleInput(s)
			next(s)
		}
	}
}

func main() {
	port := getEnv("SSH_PORT", "2222")
	hostKey := getEnv("SSH_HOST_KEY", "host_key")

	if _, err := os.Stat(hostKey); err != nil {
		if out, err := exec.Command("ssh-keygen", "-q", "-t", "ed25519", "-f", hostKey, "-N", "").CombinedOutput(); err != nil {
			fmt.Fprintln(os.Stderr, "failed to generate host key:", string(out), err)
			os.Exit(1)
		}
		fmt.Println("generated host key:", hostKey)
	}

	key, err := os.ReadFile(hostKey)
	if err != nil {
		fmt.Fprintln(os.Stderr, "cannot read host key:", err)
		os.Exit(1)
	}

	srv, err := wish.NewServer(
		wish.WithAddress(":"+port),
		wish.WithHostKeyPEM(key),
		wish.WithMiddleware(
			sessionMiddleware(),
			lm.Middleware(),
		),
	)
	if err != nil {
		fmt.Fprintln(os.Stderr, "failed to start server:", err)
		os.Exit(1)
	}

	fmt.Printf("ssh portfolio listening on :%s (host key %s)\n", port, hostKey)
	if err := srv.ListenAndServe(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}