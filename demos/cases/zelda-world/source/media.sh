#!/usr/bin/env bash
set -eu
task_input=$(cd "$1" && pwd)
mkdir -p "$2"
task_output=$(cd "$2" && pwd)
for chapter in kakeru tsukuru tsumugu; do
  awk -v prefix="$task_input/" '!/^#/ && NF { sub(/\r$/, ""); printf "file '\''%s%s'\''\n", prefix, $0; if (++count == 6) exit }' "$task_input/$chapter.m3u8" > "$task_output/$chapter.concat"
  ffmpeg -f concat -safe 0 -i "$task_output/$chapter.concat" -c:v copy -an "$task_output/$chapter.mp4"
  ffmpeg -ss 0.1 -i "$task_output/$chapter.mp4" -frames:v 1 "$task_output/$chapter-poster.jpg"
done
