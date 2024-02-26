# Helm chart

## Prerequisites

- Container image(s) built and pushed on a registry
- Kubernetes cluster (tested on 1.27)

## Installation

To deploy the app on a kubernetes cluster, from the kubernetes directory:

```
helm install --namespace chronomuscu --create-namespace \
--set containers.ui.imageRegistry=yourContainerRegistry \
chronomuscu ./chart
```

Replace `yourContainerRegistry` with yours including a `/` at the end.

> Example: --set containers.ui.imageRegistry=ghcr.io/geosdevs/

To update an existing installation:

```
helm upgrade --namespace chronomuscu \
--set containers.ui.imageRegistry={yourContainerRegistry} \
--dry-run chronomuscu ./chart
```

If you want to specify the image tag, add: `--set containers.ui.imageTag=wantedTag` by replacing `wantedTag` with yours.

> You may have to configure your hosts file with the FQDN `chronomuscu.ingress.local` to access the app.

> By default this Helm chart will deploy 3 instances of the app.
