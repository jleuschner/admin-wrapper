param(
[string]$hostname="*"
)

$f="name -like '"+$hostname+"'"
$prop = "CN","DisplayName","Description","ipv4Address","memberOf","Operatingsystem","OperatingsystemServicePack","OperatingsystemVersion"

get-adcomputer -filter $f -Properties $prop | sort name | convertTo-Json -compress

 
