---
title: "Paper on Modus Accepted in ESEC/FSE 2022"
date: 2022-11-06
draft: false
---

*Edit: our paper is now published [here](https://doi.org/10.1145/3540250.3549133). I've added the abstract below.*

ESEC/FSE 2022 accepted a paper I co-authored during my final year at university.
[Here is the preprint](/pdfs/fse22-modus-final.pdf).

## Abstract

Containers help share and deploy software by packaging it with all its dependencies. Tools, like Docker or Kubernetes, spawn containers from images as specified by a build system’s language, such as Dockerfile. A build system takes many parameters to build an image, including OS and application versions. These build parameters can interact: setting one can restrict another. Dockerfile lacks support for reifying and constraining these interactions, thus forcing developers to write a build script per workflow. As a result, developers have resorted to creating ad-hoc solutions such as templates or domain-specific frameworks that harm performance and complicate maintenance because they are verbose and mix languages.
To address this problem, we introduce Modus, a Datalog dialect for building container images. Modus' key insight is that container definitions naturally map to proof trees of Horn clauses. In these trees, container configurations correspond to logical facts, build instructions correspond to logic rules, and the build tree is computed as the minimal proof of the Datalog query specifying the target image. Modus relies on Datalog’s expressivity to specify complex workflows with concision and facilitate automatic parallelisation.
We evaluated Modus by porting build systems of six popular Docker Hub images to Modus. Modus reduced the code size by 20.1% compared to the used ad-hoc solutions, while imposing a negligible performance overhead, preserving the original image size and image efficiency. We also provide a detailed analysis of porting OpenJDK image build system to Modus.