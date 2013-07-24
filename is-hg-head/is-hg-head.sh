#! /bin/bash

# We can check if the list of children of the active commit
# is empty, in this case it means that we are in the head of
# the active branch.

children=$(hg parent --template "{children}")

if [ "$children" == "" ] ; then
    echo Current commit $(hg id -i) is head of $(hg branch) branch
else
    echo Current commit $(hg id -i) is not head of $(hg branch) branch
fi
