# md5-all

Calculates MD5 checksum of all files in the given directory in `--dir` argument.

## Usage

    node md5-all.js --dir DIRECTORY [--json FILE.json] [--quiet]

### Options

* `--dir DIRECTORY`
  Shows all checksums of the given directory.

* `--quiet`
  Doesn't show checksums in the STDOUT.

* `--json FILE.json`
  Creates a json file with the checksums information.
  
### Examples

* `node md5-all --dir C:\Users`
  Shows the MD5 of all files in the C:\Users folder.

* `node md5-all --dir . --quiet --json data.json`
  Creates `data.json` file with the checksums of all files
  in the current directory.
