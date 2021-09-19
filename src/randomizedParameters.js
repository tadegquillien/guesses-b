//these elements are randomly generated at the start of the experiment
//after being generated, they keep the same value throughout the experiment

import { shuffle } from './convenienceFunctions';
import {
    circle_ids, color_palette, mode, urn_ids, urn_letters, PROBS, colors, actualWorld,
    threshold
} from './gameParameters'

//randomly generates a list of the position of the colored balls within an urn,
//for each urn
export const ballColorsList =
    //cycle through all urns
    urn_ids.map((a) => {
        let prob = PROBS[a - 1];
        let urnColorID = colors[a - 1];
        //cycle through all balls
        let ballColors = circle_ids.map((i) => {
            //fill the urn with N colored balls, then 10-N black balls
            let number = prob * 20;
            let urnColor = color_palette[a - 1];
            let color = i < number ? urnColor : "black";
            return color;
        });
        //shuffle the urn
        ballColors = shuffle(ballColors);

        return ballColors

    });

export const comb_array = shuffle([
    [3, 3, 3, 3],
    [4, 4, 3, 1],
    [4, 4, 2, 2],
    [4, 3, 3, 2],
    [5, 4, 2, 1],
    [5, 3, 3, 1],
    [5, 3, 2, 2],
    [6, 4, 1, 1],
    [6, 3, 2, 1],
    [6, 2, 2, 2],
    [7, 3, 1, 1],
    [8, 2, 1, 1],
    [9, 1, 1, 1]
]
);

export const expanded_comb_array = comb_array.map((c) => {
    //construct an array which pre-specified the repartition
    //of colors in the urn
    let counter = -1;
    var comb_expanded =
        c.map((i) => {
            counter = counter + 1;

            return ([...Array(i).keys()].map((ii) => {
                return (counter)
            }))
        });

    comb_expanded = comb_expanded.flat();

    const shuffled_colors = shuffle(color_palette);


    return(shuffle(comb_expanded.map((i) => {
        
        return (shuffled_colors[i]);
    })));

})

//a variable randomly assigning the participant to answer the probability
//comprehension questions either before or after the main task
export const probCheckOrder = "last";

//randomize the order in which the urns are presented on the screen
//(applies to both the Training phase and Test phase)
export const shuffledUrnIds = shuffle(urn_ids);


