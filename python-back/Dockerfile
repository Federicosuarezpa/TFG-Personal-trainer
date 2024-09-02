FROM python:3.9
ADD . .
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
EXPOSE 5000
CMD ["python", "./index.py"]
