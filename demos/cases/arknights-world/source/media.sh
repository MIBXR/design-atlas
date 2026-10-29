#!/usr/bin/env bash
set -eu
task_input=$1
task_output=$2
mkdir -p "$task_output"
ffmpeg -i "$task_input/home.m3u8" -vf scale=1440:810 -c:v libx264 -crf 26 -an -movflags +faststart "$task_output/home.mp4"
ffmpeg -ss 0.1 -i "$task_output/home.mp4" -frames:v 1 "$task_output/home-poster.jpg"
