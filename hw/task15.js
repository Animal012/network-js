const readline = require('readline');

function findMaxQualityDifference(nums) {
    let maxDifference = -Infinity;
    const n = nums.length;

    for (let w = 0; w < n; w++) {
        for (let x = 0; x < n; x++) {
            if (w === x) continue;
            for (let y = 0; y < n; y++) {
                if (y === w || y === x) continue;
                for (let z = 0; z < n; z++) {
                    if (z === w || z === x || z === y) continue;
                    const product1 = nums[w] * nums[x];
                    const product2 = nums[y] * nums[z];
                    const difference = product1 - product2;
                    if (difference > maxDifference) {
                        maxDifference = difference;
                    }
                }
            }
        }
    }

    return maxDifference;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите массив целых чисел через запятую: ', (input) => {
    const nums = input.split(',').map(Number);
    const result = findMaxQualityDifference(nums);
    console.log('Максимальная качественная разница:', result);
    rl.close();
});
