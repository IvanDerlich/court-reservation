if [ "$1" == '' ]; then
  exit 1:
fi

baseURL='http://localhost:3000/v1'
resource='/contacts'
URL=$baseURL$resource

echo 'option chosen: ' $1;
echo "URL: "$URL

if [ "$1" == 'ra' ]; then
  echo 'Executing "Read all" option'
  curl $URL\
    -H "Content-type: aplication/json; charset=UTF-8"\
    -v;
elif [ $1 == 'c' ]; then
  echo 'Create' 
  dir=$(dirname $0)
  curl $URL\    
    -v\
    -X POST\
    -d first_name=Ivan\
    -d last_name=Derlich\
    -d email=ivanderlich@gmail.com;
elif [ $1 == 'cj' ]; then
  echo 'Create a Json File' 
  dir=$(dirname $0)
  curl $URL\
    -H "Content-Type: application/json"\
    -v\
    -X POST\
    -d @$dir/contact1.json;    
fi