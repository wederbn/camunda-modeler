FROM node:15.6.0-alpine3.10 as builder
COPY . /tmp
WORKDIR /tmp

ENV USE_SYSTEM_7ZA true

RUN apk add --update --no-cache p7zip

RUN npm install -g lerna npm-run-all webpack

RUN npm install && npm run build

FROM ubuntu:18.04
LABEL maintainer = "Benjamin Weder <benjamin.weder@iaas.uni-stuttgart.de>"

COPY --from=builder /tmp/dist/linux-unpacked /quantme

WORKDIR /quantme

# install and start xvfb to run in headless mode or access modeler via x11 forwarding
RUN apt-get update && \
    apt-get install -qqy libgtk2.0-0 libgconf-2-4 \
    libasound2 libxtst6 libxss1 libnss3 xvfb   
RUN Xvfb -ac -screen scrn 1280x2000x24 :9.0 & export DISPLAY=:9.0

# install shared libraries required by the modeler
RUN apt-get -qqy install libnss3-dev libgtk2.0-0 libgtk-3-0 libxss1

CMD ./quantme-modeler