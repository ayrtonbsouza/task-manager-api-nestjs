FROM node:20.5.1-slim

RUN mkdir -p /usr/share/man/man1 && \
  echo 'deb http://deb.debian.org/debian bullseye-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
  apt update && apt install -y \
  git \
  ca-certificates \
  openssh-client \
  zsh \
  curl \
  wget \
  tzdata

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

ENV TZ="America/Sao_Paulo"

USER node

WORKDIR /home/node/app

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
  -t https://github.com/denysdovhan/spaceship-prompt \
  -p git \
  -a 'SPACESHIP_PROMPT_ORDER=(user dir host git hg exec_time line_sep jobs exit_code char)' \
  -a 'SPACESHIP_USER_SHOW=always' \
  -a 'SPACESHIP_PROMPT_ADD_NEWLINE=false' \
  -a 'SPACESHIP_CHAR_SYMBOL="❯"' \
  -a 'SPACESHIP_CHAR_SUFFIX=" "'

CMD ["tail", "-f", "/dev/null"]
