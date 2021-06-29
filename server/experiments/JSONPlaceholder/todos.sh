if [ "$1" == '' ]; then
  echo "Please enter option";
  exit 1:
fi

echo 'option chosen: ' $1;
baseURL='http://jsonplaceholder.typicode.com/'
resource='posts'
URL=$baseURL$resource

if [ "$1" == 'ra' ]; then
  echo 'Executing "Read all" option'
  curl $URL\
    -H "Content-type: aplication/json; charset=UTF-8"\
    -v;
elif [ $1 == 'cp' ]; then
  echo 'Executing "Create Post" option'
  curl $URL\
    -H "Content-type: aplication/json; charset=UTF-8"\  
    -v\
    -X POST\
    -d title=foo\
    -d body=bar;    
elif [ $1 == 'cpj' ]; then
  echo 'Executing "Create Post with Json format" option'
  curl $URL\
    -H "Content-type: aplication/json; charset=UTF-8"\
    -v\
    -X POST\
    -d '{\
    "title":"disney",\
    "body":"land"}':
elif [ $1 == 'cpjf' ]; then
  echo 'Executing "Create Post with Json format" option'
  curl $URL\
    -H "Content-type: aplication/json; charset=UTF-8"\
    -v\
    -X POST\
    -d @$0/todoExample.json;
elif [ $1 == 'rs' ]; then  
  URL=$URL'/1'
  echo 'Executing read a single post with id 1 at this endpoint'
  echo $URL
  curl $URL\
    -H "Content-type: aplication/json; charset=UTF-8";
elif [ $1 == 'uput' ]; then 
  URL=$URL'/1'
  echo 'Executing UPDATE with PUT a single post with id 1 at this endpoint'
  echo $URL
  curl $URL\  
    -H "Content-type: aplication/json; charset=UTF-8"\
    -X PUT\
    -d title=foo\
    -d body=barbar;
elif [ $1 == 'upat' ]; then 
  URL=$URL'/1'
  echo 'Executing UPDATE with PATCH a single post with id 1 at this endpoint'
  echo $URL
  curl $URL\
    -H "Content-type: aplication/json; charset=UTF-8"\
    -X PATCH\
    -d title=foofoo;
elif [ $1 == 'd' ]; then 
  URL=$URL'/1'
  echo 'Executing DELETE a single post with id 1 at this endpoint'
  echo $URL
  curl -v $URL\   
    -H "Content-type: aplication/json; charset=UTF-8"\
    -X DELETE;  
elif [ $1 == 'rsrc' ]; then  
  URL=$URL'/1'
  echo 'Executing print response code while reading a single post with id 1 at this endpoint'
  echo $URL
  curl $URL\
    -w '%{response_code}'\
    -H "Content-type: aplication/json; charset=UTF-8"; 
elif [ $1 == 'login' ]; then 
  echo "Executing login to a specified URL"
  URL='desired URL '
  curl $URL\
    -v\
    -u admin:secret;
elif [ $1 == 'login2' ]; then 
  echo "Executing login to a specified URL with headers"
  URL='google.com'
  curl $URL\
    -v\
    -H "Authorization: Basic $(echo -n admin:secret|base 64)";
elif [ $1 == 'inspect' ]; then
  echo "Inspecting headers"
  URL="google.com"
  curl $URL\
    -I\
    -X GET;
elif [ $1 == 'inspectr' ]; then
  echo "Inspecting headers and follow redirect"
  URL="google.com"
  # can use --head flag instead
  curl $URL\
    -I\
    -L\
    -X GET;
elif [ $1 == 'ignoreic' ]; then
  echo "Ignore invalid certificates"
  URL="google.com"
  curl $URL\
    -I\
    -k\    
    -X GET;
elif [ $1 == 'save' ]; then
  echo 'Save output to a file'
  curl $URL\
    -H "Content-type: aplication/json; charset=UTF-8"\
    -v\
    -o experiments/JSONPlaceholder/save.json;
fi

# improvements: add -v flag to the script to pass the -v flag to curl to make it verbose
# https://www.banjocode.com/flags-bash/
# Curl with FTP
# http://www.mukeshkumar.net/articles/curl/how-to-use-curl-command-line-tool-with-ftp-and-sftp