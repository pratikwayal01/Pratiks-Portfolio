import { remark } from 'remark'
import html from 'remark-html'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
}

// Sample blog posts data
const blogPosts = [
  {
    slug: 'ha-postgresql-cluster',
    title: 'Setting Up a High-Availability PostgreSQL Cluster',
    date: '2024-03-20',
    description: 'A comprehensive guide to setting up and managing a highly available PostgreSQL cluster using Patroni and etcd',
    tags: ['PostgreSQL', 'DevOps', 'High Availability', 'Database'],
    content: `# Setting Up a High-Availability PostgreSQL Cluster

In today's world of distributed systems and cloud-native applications, database high availability is not just a nice-to-have feature—it's a critical requirement. This guide will walk you through setting up a highly available PostgreSQL cluster using Patroni and etcd.

## Why High Availability?

High availability (HA) ensures that your database remains operational even when individual components fail. This is achieved through:

- Automatic failover
- Data replication
- Load balancing
- Health monitoring

## Prerequisites

Before we begin, ensure you have:

1. Three or more servers (physical or virtual)
2. Network connectivity between servers
3. Sufficient storage for your data
4. Basic understanding of PostgreSQL

## Architecture Overview

Our HA PostgreSQL cluster will consist of:

- Primary node (master)
- Replica nodes (standbys)
- etcd cluster for distributed consensus
- Patroni for cluster management

## Step 1: Setting Up etcd

First, we'll set up the etcd cluster for distributed configuration management:

\`\`\`bash
# Install etcd
wget https://github.com/etcd-io/etcd/releases/download/v3.5.0/etcd-v3.5.0-linux-amd64.tar.gz
tar xvf etcd-v3.5.0-linux-amd64.tar.gz
sudo mv etcd-v3.5.0-linux-amd64/etcd* /usr/local/bin/

# Configure etcd service
sudo nano /etc/systemd/system/etcd.service
\`\`\`

## Step 2: Installing PostgreSQL and Patroni

Next, we'll install PostgreSQL and Patroni on all nodes:

\`\`\`bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql-14

# Install Patroni
sudo pip3 install patroni[etcd]
\`\`\`

## Step 3: Configuring Patroni

Create the Patroni configuration file:

\`\`\`yaml
scope: postgres
namespace: /db/
name: postgresql0

restapi:
  listen: 0.0.0.0:8008
  connect_address: 192.168.1.10:8008

etcd:
  hosts: 192.168.1.10:2379,192.168.1.11:2379,192.168.1.12:2379

bootstrap:
  dcs:
    ttl: 30
    loop_wait: 10
    retry_timeout: 10
    maximum_lag_on_failover: 1048576
    postgresql:
      use_pg_rewind: true
      parameters:
        max_connections: 100
        shared_buffers: 128MB
        wal_level: replica
        hot_standby: "on"
\`\`\`

## Step 4: Starting the Cluster

Initialize and start the cluster:

\`\`\`bash
# Start etcd
sudo systemctl start etcd

# Start Patroni
sudo systemctl start patroni
\`\`\`

## Monitoring and Maintenance

Regular maintenance tasks include:

1. Monitoring cluster health
2. Checking replication lag
3. Performing backups
4. Updating configurations

## Conclusion

Setting up a high-availability PostgreSQL cluster requires careful planning and configuration, but the benefits in terms of reliability and performance are well worth the effort. Remember to:

- Regularly test failover scenarios
- Monitor cluster health
- Keep software up to date
- Maintain proper backups

## Next Steps

In future posts, we'll cover:

- Advanced configuration options
- Backup and restore strategies
- Performance tuning
- Security best practices

Stay tuned for more detailed guides on managing your HA PostgreSQL cluster!`
  },
  {
    slug: 'intro-to-kubernetes',
    title: 'Introduction to Kubernetes for Developers',
    date: '2024-04-10',
    description: 'A beginner-friendly guide to understanding Kubernetes and container orchestration.',
    tags: ['Kubernetes', 'Containers', 'DevOps'],
    content: `# Introduction to Kubernetes for Developers

Kubernetes is an open-source platform designed to automate deploying, scaling, and operating application containers. In this post, we'll cover the basics of Kubernetes and why it's become the de facto standard for container orchestration.

## What is Kubernetes?

Kubernetes (K8s) is a system for managing containerized applications across a cluster of machines. It provides tools for deploying applications, scaling them as needed, managing changes, and helping optimize the use of underlying hardware.

## Key Concepts

- **Pod**: The smallest deployable unit in Kubernetes, usually a single container.
- **Service**: An abstraction that defines a logical set of Pods and a policy by which to access them.
- **Deployment**: Manages the deployment and scaling of Pods.
- **Cluster**: A set of nodes (machines) running containerized applications managed by Kubernetes.

## Why Use Kubernetes?

- Automated rollouts and rollbacks
- Service discovery and load balancing
- Storage orchestration
- Self-healing

## Getting Started

To get started with Kubernetes, you can use Minikube to run a local cluster or try managed services like Google Kubernetes Engine (GKE), Amazon EKS, or Azure AKS.

## Conclusion

Kubernetes is a powerful tool for modern application development and deployment. In future posts, we'll dive deeper into advanced topics like Helm, Operators, and best practices for production deployments.`
  },
  {
    slug: 'ci-cd-pipeline',
    title: 'Building a CI/CD Pipeline with GitHub Actions',
    date: '2024-04-01',
    description: 'Learn how to automate your deployments using GitHub Actions for continuous integration and delivery.',
    tags: ['CI/CD', 'GitHub Actions', 'Automation', 'DevOps'],
    content: `# Building a CI/CD Pipeline with GitHub Actions

Continuous Integration and Continuous Delivery (CI/CD) are essential practices for modern software development. In this post, we'll set up a simple CI/CD pipeline using GitHub Actions.

## What is CI/CD?

- **Continuous Integration (CI)**: Automatically building and testing code changes.
- **Continuous Delivery (CD)**: Automatically deploying code to production after passing tests.

## Why GitHub Actions?

GitHub Actions is a powerful automation tool built into GitHub. It allows you to automate workflows for building, testing, and deploying code.

## Example Workflow

Here's a basic workflow for a Node.js app:

\`\`\`yaml
name: CI/CD Pipeline
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build
\`\`\`

## Conclusion

With GitHub Actions, you can automate your entire development workflow, from code review to deployment. In future posts, we'll explore advanced workflows and deployment strategies.`
  }
]

// Get all posts
export async function getAllPosts(): Promise<Omit<BlogPost, 'content'>[]> {
  return blogPosts.map(({ content, ...post }) => post)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = blogPosts.find(p => p.slug === slug)
    if (!post) return null

    const processedContent = await remark()
      .use(html)
      .process(post.content)

    return {
      ...post,
      content: processedContent.toString()
    }
  } catch (error) {
    console.error('Error loading post:', error)
    return null
  }
} 