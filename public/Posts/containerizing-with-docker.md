# Containerising Applications with Docker

*A practical guide to packaging your applications into portable, reproducible Docker containers — from zero to production-ready.*

---

## Why Docker?

Before Docker, deploying an application meant dealing with the classic *"it works on my machine"* problem. Every environment — dev, staging, prod — had slightly different OS versions, dependency versions, and configs. Docker solves this by bundling your application with everything it needs into a single portable unit called a **container**.

Containers are:
- **Lightweight** — they share the host OS kernel, unlike VMs
- **Reproducible** — same image runs identically everywhere
- **Isolated** — processes, networks, and filesystems are sandboxed
- **Fast** — start in milliseconds, not minutes

---

## Core Concepts

### Images vs Containers

- **Image** — a read-only blueprint (think: class)
- **Container** — a running instance of an image (think: object)

```
docker pull nginx          # download image
docker run -d -p 80:80 nginx  # start container from image
```

### Dockerfile

A `Dockerfile` is a script that tells Docker how to build your image layer by layer.

```dockerfile
# Start from official Python base image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy dependency list and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source
COPY . .

# Expose the port the app listens on
EXPOSE 8000

# Command to run when container starts
CMD ["python", "app.py"]
```

Each `RUN`, `COPY`, and `ADD` instruction creates a new **layer**. Docker caches layers — so put things that change least (like `pip install`) before things that change most (your source code).

---

## Building and Running

```bash
# Build image from Dockerfile in current directory
docker build -t my-app:latest .

# Run container, map host port 8000 → container port 8000
docker run -d -p 8000:8000 --name my-app my-app:latest

# View running containers
docker ps

# View logs
docker logs my-app

# Stop and remove
docker stop my-app && docker rm my-app
```

---

## Multi-stage Builds

Multi-stage builds keep your final image lean by discarding build-time dependencies:

```dockerfile
# Stage 1: build
FROM golang:1.21 AS builder
WORKDIR /src
COPY . .
RUN go build -o /bin/app .

# Stage 2: minimal runtime
FROM alpine:3.18
COPY --from=builder /bin/app /bin/app
ENTRYPOINT ["/bin/app"]
```

The final image only contains the compiled binary — no Go toolchain, no source code. Typical Go image shrinks from ~800 MB → ~10 MB.

---

## Docker Compose

For multi-service applications (app + database + cache), use **Docker Compose**:

```yaml
# docker-compose.yml
version: "3.9"

services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

```bash
docker compose up -d     # start all services
docker compose down      # stop and remove containers
docker compose logs -f   # follow logs from all services
```

---

## Best Practices

**1. Use `.dockerignore`** — exclude files that don't belong in the image:
```
node_modules/
.git/
*.log
.env
dist/
```

**2. Run as non-root** — never run your app as root inside a container:
```dockerfile
RUN adduser --disabled-password appuser
USER appuser
```

**3. Pin base image versions** — `FROM python:3.11-slim` not `FROM python:latest`

**4. One process per container** — let the orchestrator (Kubernetes, Compose) manage lifecycles

**5. Keep images small** — use `slim` or `alpine` variants, clean up in the same `RUN` layer:
```dockerfile
RUN apt-get update && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*
```

---

## From Docker to Production

Once you have a working Docker image, the natural next step is **container orchestration**. Docker Compose works great locally and for small deployments, but for production you want:

- **Kubernetes** — for large-scale orchestration, auto-scaling, rolling updates
- **AWS ECS / Fargate** — managed containers without managing nodes
- **ArgoCD + Helm** — GitOps-based declarative deployments

I've used all of these at Dpdzero, migrating workloads from ECS → EKS and setting up GitOps pipelines with ArgoCD. Docker is always where the journey starts.

---

## Conclusion

Docker fundamentally changed how we build and ship software. Once you containerise an application, you get reproducibility, portability, and a clear path to Kubernetes and beyond. Start with a simple `Dockerfile`, graduate to Compose for local dev, and you're well on your way to production-grade deployments.
