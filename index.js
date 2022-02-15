#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';





let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants To Be A JavaScript Millionaire?\n'
    )

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed('killed')}
        So get all the questions right...
        
    `)
}

//ASKING PLAYER NAME 

async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default(){
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

//QUESTIONS

async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'JavaScript was created in 10 days then released on\n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17, 1996',
        ],
    });

    return handleAnswer(answers.question_1 === 'Dec 4th, 1995');
}

async function question2(){
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Which one of the following also known as Conditional Expression:\n',
        choices: [
            'Alternative to if-else',
            'Switch statement',
            'If-then-else statement',
            'immediate if',
        ],
    });

    return handleAnswer(answers.question_2 === 'immediate if');
}

async function question3(){
    const answer = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'In JavaScript, what is a block of statement?\n',
        choices: [
            'Conditional block',
            'block that combines a number of statements into a single compound statement',
            'both conditional block and a single statement',
            'block that contains a single statement',
        ],
    });

    return handleAnswer(answers.question3 === 'block that combines a number of statements into a single compound statement');
}

async function question4(){
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'When interpreter encounters an empty statements, what it will do:\n',
        choices: [
            'Shows a warning',
            'Prompts to complete the statement',
            'Throws an error',
            'Ignores the statements',
        ],
    });

    return handleAnswer(answers.question_4 === 'Ignores the statements');
}

async function question5(){
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'The "function" and " var" are known as:\n',
        choices: [
            'Keywords',
            'Data types',
            'Declaration statements',
            'Prototypes',
        ],
    });
}

async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's a legit answer!\n`});
    } else{
        spinner.error({ text: `XXX Game Over, you lose ${playerName}!`});
        process.exit(1);
    }
}

//WINNER FUNCTION

function winner(){
    console.clear();
    const msg = `Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();