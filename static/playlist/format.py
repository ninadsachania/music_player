#! /usr/bin/env python3

import os
import sys

files = os.listdir()

for f in files:
    new_name = str(f)
    new_name.replace('_', ' ')
    new_name.replace('  ', ' ')
    new_name.replace('/', '')
    new_name.replace('\'', '')
    try:
        os.rename(str(f), new_name)
        print('Done: {}'.format(f))
    except OSError:
        sys.stderr.write('{} already exists'.format(new_name))
