#!/bin/bash
(
IFS=$'\n'
for y in $(ls $1)
do
mv $1/`echo $y | sed 's/ /\\ /g'` $1/`echo "$y" | sed 's/ /_/g'`
done
)
