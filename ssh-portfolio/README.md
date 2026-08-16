# ssh-portfolio

SSH TUI version of the portfolio. Same commands as the browser terminal, over real SSH.

```
ssh pratik@<host> -p 2222          # interactive shell
ssh pratik@<host> -p 2222 "about"  # one-shot
```

## Build & run

```sh
go build -o ssh-portfolio .
./ssh-portfolio          # port 2222, host key ./host_key (auto-generated)
```

Env: `SSH_PORT`, `SSH_HOST_KEY`.

## Deploy (VPS / EC2)

Needs a server Vercel can't provide — any VPS works (DigitalOcean, Hetzner, AWS EC2, Oracle free tier).

```sh
# 1. copy binary + host key to server
scp ssh-portfolio user@vps:/opt/ssh-portfolio/

# 2. systemd unit — /etc/systemd/system/ssh-portfolio.service
[Unit]
Description=SSH portfolio
After=network.target

[Service]
ExecStart=/opt/ssh-portfolio/ssh-portfolio
Restart=always
WorkingDirectory=/opt/ssh-portfolio

[Install]
WantedBy=multi-user.target

sudo systemctl daemon-reload && sudo systemctl enable --now ssh-portfolio
```

```sh
# 3. DNS — A record ssh.yourdomain.com → VPS IP
# 4. firewall — open 2222 (or run on 22 if sshd moved aside)
ufw allow 2222/tcp
```

Connect: `ssh pratik@ssh.yourdomain.com -p 2222`

## Notes

- No auth — anyone can connect. It's a read-only toy shell (like terminal.shop); no system access, all commands are fake.
- Change the port in the systemd unit + `SSH_PORT` env if 2222 conflicts.