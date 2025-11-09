ARG NITRO_NODE_VERSION
FROM offchainlabs/nitro-node:$NITRO_NODE_VERSION AS nitro-node-stylus-dev
USER root
RUN apt-get update && \
    apt-get install -y git python3 make g++ curl pkg-config libssl-dev bash
# Install Foundry (provides 'cast') inside the image so we can run prerequisites via docker exec
RUN bash -lc "curl -L https://foundry.paradigm.xyz | bash && source ~/.bashrc && ~/.foundry/bin/foundryup"
ENV PATH="/root/.foundry/bin:${PATH}"
