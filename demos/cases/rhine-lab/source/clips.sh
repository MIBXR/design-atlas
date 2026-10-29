#!/usr/bin/env bash
set -eu
task_input=$1
task_output=$2
mkdir -p "$task_output"
ffmpeg -ss 19.2 -i "$task_input" -t 4.2 -an -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -movflags +faststart "$task_output/permission.mp4"
ffmpeg -ss 27 -i "$task_input" -t 12.2 -an -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -movflags +faststart "$task_output/archive.mp4"
ffmpeg -ss 39.2 -i "$task_input" -t 12.3 -an -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -movflags +faststart "$task_output/optics.mp4"
ffmpeg -ss 59.6 -i "$task_input" -t 13.8 -an -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -movflags +faststart "$task_output/matrix.mp4"
