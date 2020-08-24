// Toolbox provides a nicer interface to assemble lower level functions.

import * as Canvas from './canvas';
import * as Config from './config';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import yamljs from 'yamljs';


export async function quotaCommandHandler() {

}

export async function yamlGenerateHandler() {
  const defaultConfig = Config.mkDefaultConfig();

}

export async function courseCommandHandler(args: {
  all?: boolean,
}) {
  const courses = await Canvas.getCourses();
  const summariedCourses = courses.map((e, i) => ({
    name: e.name,
    id: i,
    courseCode: e.course_code,
    startAt: e.start_at.split('T')[0],
    endAt: e.end_at.split('T')[0],
    progres: e.course_progress
  }));

  console.log();
  console.log("Course List:");
  summariedCourses.forEach(e => {
    console.log("  * course name:      ", chalk.blue(e.name));
    if (args.all) {
      console.log("     | course id:     ", chalk.blue(e.id));
      console.log("     | course code:   ", chalk.blue(e.courseCode));
      console.log("     | course period: ",
        `${chalk.blue(e.startAt)} - ${chalk.blue(e.endAt)}`);
    }
  })
  console.log();
}

export async function userCommandHandler() {

}

export async function downloadCommandHandler() {

}
