param(
[string]$hostname="*"
)

$f="name -like '"+$hostname+"'"
$prop = "CN","DisplayName","Description","ipv4Address","memberOf","Operatingsystem","OperatingsystemServicePack","OperatingsystemVersion"

$out=@()
get-adcomputer -filter $f -Properties $prop | sort name | %{ 
    $newrow = New-Object PSObject -Property @{
        Name = $_.name
        DisplayName = $_.DisplayName
        memberOf = $_.memberOf
        Operatingsystem = $_.Operatingsystem
    }
    $out += $newrow    
}

if ($out) {$out | convertTo-json -compress}
else { "[]" }

 
