FROM node:15.6.0-alpine3.10 as builder
COPY . /tmp
WORKDIR /tmp

ENV USE_SYSTEM_7ZA true

RUN apk add --update --no-cache p7zip

RUN npm install && npm run build

FROM ubuntu:18.04
LABEL maintainer = "Benjamin Weder <benjamin.weder@iaas.uni-stuttgart.de>"

COPY --from=builder /tmp/dist/linux-unpacked /quantme

WORKDIR /quantme

RUN ls

CMD ./quantme-modeler