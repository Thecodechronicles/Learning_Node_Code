// const { readdirSync, rename } = require('fs');
// const { resolve } = require('path');

// // Get path to image directory
// const imageDirPath = resolve(__dirname, '[imgs_folder_name]');

// // Get an array of the files inside the folder
// const files = readdirSync(imageDirPath);

// // Loop through each file that was retrieved
// files.forEach(file => rename(
//   imageDirPath + `/${file}`,
//   imageDirPath + `/${file.toLowerCase()}`,
//   err => console.log(err)
// ));

// '/home/ankit/Downloads/videoTutorials/PHP/PHP with Laravel for beginners - Become a Master in Laravel/[TutsNode.com] - PHP with Laravel for beginners - Become a Master in Laravel'

// '/home/ankit/Downloads/videoTutorials/PHP/PHP_Beginner_Master_CMS/[DesireCourse.Com] Udemy - Php for Complete Beginners Includes Msql Object Oriented'

// '/home/ankit/Downloads/videoTutorials/PHP/PhpForBeginners/SaleWebDesign.com-PHP-for-Beginners'

// '/home/ankit/Downloads/videoTutorials/Javascript/JavaScript - The Complete Guide 2020 (Beginner + Advanced)/[TutsNode.com] - JavaScript - The Complete Guide 2020 (Beginner + Advanced)'

// '/home/ankit/Downloads/videoTutorials/Java_Spring/01 [HowToFree.Org]_Spring&Hibernate_forBeginners'

// '/home/ankit/Downloads/videoTutorials/Java_Spring/Spring Framework 5 Beginner to Guru/[TutsNode.com] - Spring Framework 5 Beginner to Guru'

// '/home/ankit/Downloads/AndroidDevelopment/Android_Oreo_Developer_Course'

// '/home/ankit/Downloads/AndroidDevelopment/The_Complete_Android_N_Developer_Course'

// '/home/ankit/Downloads/AndroidDevelopment/Android_App_Development_From_Scratch/Android_App_Development_From_Scratch_Folder'

// '/home/ankit/Downloads/AndroidDevelopment/MVI-architecture-Android-XML-layouts'

// '/home/ankit/Downloads/ReactNative-ThePracticalGuide[2021Edition]/ReactNative-The_Practical_Guide_[2021 Edition]'

// '/home/ankit/Downloads/ReactNative-ThePracticalGuide[2022]/[TutsNode.com]-ReactNative-ThePracticalGuide[2022]'

// '/home/ankit/Downloads/[FreeCourseSite.com]Udemy-AndroidArchitectureMasterclass'

// '/home/ankit/Downloads/videoTutorials/Android/IndrotuctionToAndroidDeveoment/Introduction_to_Android_Development'

// '/home/ankit/Downloads/videoTutorials/Git/Learning Git and GitHub/[TutsNode.com] - Learning Git and GitHub'

// /home/ankit/Downloads/videoTutorials/Android/The_comprehensive_2019_android_development_masterclass

const { readdirSync, rename } = require('fs');
const { resolve } = require('path');

const renameRootFolder = 'FileFolderRenamePracticeTemp';

// const dirPath = resolve(__dirname, renameRootFolder);
const dirPath = '/home/ankit/Downloads/videoTutorials/Android/The_comprehensive_2019_android_development_masterclass';
console.log('current dirName: ', __dirname);
console.log('dirPath: ', dirPath);

const filesNFoldersArr = readdirSync(dirPath);

const filesNFolders = filesNFoldersArr.filter((fileOrFolder) => {
    return !Object.is(Number(fileOrFolder.split(" ", 1)[0]), NaN);
});

console.log('filesNfoldersArr: ', filesNFoldersArr);
console.log("\t");
console.log('filesNfolders: ', filesNFolders);
console.log("\t")

console.log('Folders: ', filesNFolders.length);

filesNFolders.forEach(fileOrFoldername => {

    const fileOrFolderPath = resolve(dirPath, fileOrFoldername);
    const stringBreakFolder = fileOrFoldername.split(" ", 1);
    const stringBreakFolderElement = Number(stringBreakFolder[0]).toString();

    // console.log('stringBreakFolderElement: ', stringBreakFolderElement);

    // if (Object.is(stringBreakFolderElement, 'NaN')) {
    //     return console.log('Folders are unbreakable into numbers !');
    // }

    console.log(`'${fileOrFoldername}' : String Break Folder--> ${stringBreakFolderElement}`);

    const filesArr = readdirSync(dirPath + `/${fileOrFoldername}`);

    const files = filesArr.filter((file) => {
        return !Object.is(Number(file.split(" ", 1)[0]), NaN);
    });

    console.log('filesArr: ', filesArr);
    console.log("\t");
    console.log('files: ', files);
    console.log("\t")


    console.log('Files: ', files.length);

    files.forEach(fileName => {

        const stringBreakFile = fileName.split(" ", 1);
        const stringBreakFileElement = stringBreakFile[0];

        console.log(`    '${fileName}' : String Break File--> ${stringBreakFileElement}`);

        if (!stringBreakFileElement.includes('.')) {

            console.log('        NewStringBreakFile: ', stringBreakFileElement);

            rename(
                fileOrFolderPath + `/${fileName}`,
                fileOrFolderPath + `/${stringBreakFolderElement}.` + `${fileName}`,
                err => err && console.log(err)
            );

            return;
        }
        else if (stringBreakFileElement.indexOf('.') == stringBreakFileElement.length - 1) {

            const newFileName = fileName.replace('.', '');
            console.log('NewFileName: ', newFileName);

            rename(
                fileOrFolderPath + `/${fileName}`,
                fileOrFolderPath + `/${stringBreakFolderElement}.` + `${newFileName}`,
                err => err && console.log(err)
            );

        }
    });
    console.log('\t');
}
);
// console.log(filesNFolders);