FROM nginx:1.13.8

COPY ./static/index.html /usr/share/nginx/html/index.html
COPY ./static/api-docs /usr/share/nginx/html/api-docs
COPY load-balancer.conf /etc/nginx/conf.d/default.conf
