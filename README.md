# Kurocado Studio Identity & Access Management

This repository provides a centralized IAM (Identity & Access Management) solution for
[Kurocado Studio](https://www.kurocado.studio).  
It includes modules, utilities, and guidelines to streamline authentication, authorization, and user
management across our projects.

## Documentation

For a complete overview of this IAM solution’s objectives, usage scenarios, and success criteria,
please see the [IAM Overview](https://kurocado-studio.github.io/iam)

## Prerequisites

- **Node.js v20 or higher**  
  [Download Node.js](https://nodejs.org/)

- **PNPM**  
  [PNPM Installation Guide](https://pnpm.io/installation)  
  You can install PNPM globally with:
  ```bash
  npm install -g pnpm
  ```

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kurocado-studio/iam.git
   cd iam
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Initial setup**:
   ```bash
   pnpm run setup
   ```
   This command will install all required packages and run any setup scripts (like linking local
   dependencies).

## Local Development

- **Start Development**

  ```bash
  pnpm run dev
  ```

- **Build All Packages**:

  ```bash
  pnpm run build
  ```

- **Run Tests**:

  ```bash
  pnpm run test
  ```

- **Lint Code**:
  ```bash
  pnpm run lint
  ```
