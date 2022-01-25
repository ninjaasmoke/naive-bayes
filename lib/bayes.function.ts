const movieReviews: {
    [document: string]: "+" | "-",
} = {
    "I loved the movie": "+",
    "I hated the movie": "-",
    "I liked the movie": "+",
    "I disliked the movie": "-",
    "It was a great movie": "+",
    "It was a bad movie": "-",
    "It was a good movie": "+",
    "The movie was terrible": "-",
    "The movie was good": "+",
    "The movie was bad": "-",
    "The acting was great": "+",
    "The acting was bad": "-",
    "Poor acting. Poor movie": "-",
    "Good acting": "+",
    "Bad acting. Very poor movie": "-",
    "The story was good": "+",
    "The story was bad": "-",
    "The story was terrible": "-",
    "The story was great": "+",
    "The actors were amazing": "+",
    "a great movie. good movie": "+",
    "poor acting": "-",
    "great acting. a good movie": "+",
    "bad acting. poor movie": "-",
    "I've been a fan of Christopher Nolan for a long time, ever since Memento. The Prestige is an entertaining thriller from writer/director Christopher Nolan the man behind films like Memento, Insomnia, Batman Begins, and The Dark Knight. The Prestige is about two magicians Robert Angier and Alfred Borden whose friendship turns into an intense rivalry that leads them on a life long battle for supremacy. The Prestige is absolutely one of the best movies I've ever watched in my life. Christopher Nolan, never fails to amazes me. The unpredictability of the movie is very rare now in movies, a lot of plot twists, including Tesla. Christian Bale and Hugh Jackman delivers with their astonishing performances, besides of course the great Michael Caine. There will never be a movie alike, and I'll surely recommend this movie for everybody." : "+",
    "I love magic, I feel that it exists within our world everyday, and everywhere around us. I absolutely loved the movie, the climax built all the way up until the end and it leaves you with a bang! It takes you back in time, and is able to give you insight on how magic may have worked during that time period, simply an idea. My favorite part about the whole movie is how they incorporated Tesla. For a moment because of Tesla it takes you outside of reality. The main plot was about how two magicians seek revenge from one another until the very end. The twist about the whole thing was how they both had been cloned, they had me fooled until the end, you'll be surprised if you watch! Definitely worth it. This is one of my first movie reviews, I can't wait to write more so I can improve my writing and opinions, and so I can become more detailed. Excited for this new journey. Hopefully this review helps you:)": "+"
}



var positivieProbabilityOfWords = new Map<string, number>();
var negativeProbabilityOfWords = new Map<string, number>();

const totalReviews = Object.keys(movieReviews).length;
const posR = Object.keys(movieReviews).filter(key => movieReviews[key] === "+").length;
const negR = totalReviews - posR;



function naiveLearner(reviews: { [document: string]: "+" | "-"; }) {

    const positiveReviews = Object.keys(reviews).filter(key => reviews[key] === "+");
    const positiveWordsMap = positiveReviews.reduce((acc, curr) => {
        const words = curr.split(" ");
        words.forEach(word => {
            if (acc.has(word)) {
                const w = acc.get(word);
                if (w)
                    acc.set(word, w + 1);
            } else {
                acc.set(word, 1);
            }
        });
        return acc;
    }, new Map<string, number>());


    const negativeReviews = Object.keys(reviews).filter(key => reviews[key] === "-");
    const negativeWordsMap = negativeReviews.reduce((acc, curr) => {
        const words = curr.split(" ");
        words.forEach(word => {
            if (acc.has(word)) {
                const w = acc.get(word);
                if (w)
                    acc.set(word, w + 1);
            } else {
                acc.set(word, 1);
            }
        });
        return acc;
    }, new Map<string, number>());

    // find the unique words in the reviews, movie reviews' keys
    const uniqueWords = new Set<string>();
    for (const review of Object.keys(reviews)) {
        const words = review.split(" ");
        for (const word of words) {
            uniqueWords.add(word.replace(/[^\w\s]/gi, ''));
        }
    }

    const numberOfPosWords = Array.from(positiveWordsMap.values()).reduce((acc, curr) => acc + curr, 0);
    const numberOfNegWords = Array.from(negativeWordsMap.values()).reduce((acc, curr) => acc + curr, 0);

    const positiveProbabilityOfWord = (word: string): number => {
        const count = positiveWordsMap.get(word);
        if (count) {
            const p = (count + 1) / (numberOfPosWords + uniqueWords.size);
            return p;
        }
        return 1 / (numberOfPosWords + uniqueWords.size);
    }

    const negativeProbabilityOfWord = (word: string): number => {
        const count = negativeWordsMap.get(word);
        if (count) {
            const p = (count + 1) / (numberOfNegWords + uniqueWords.size);
            return p;
        }
        return 1 / (numberOfNegWords + uniqueWords.size);
    }

    positivieProbabilityOfWords = Array.from(uniqueWords).reduce((acc, curr) => {
        const p = positiveProbabilityOfWord(curr);
        acc.set(curr, p);
        return acc;
    }, new Map<string, number>());

    negativeProbabilityOfWords = Array.from(uniqueWords).reduce((acc, curr) => {
        const p = negativeProbabilityOfWord(curr);
        acc.set(curr, p);
        return acc;
    }, new Map<string, number>());

}

naiveLearner(movieReviews);

function classifyReview(review: string): {} {
    const words = review.split(" ");
    const p = words.reduce((acc, curr) => {
        const p = positivieProbabilityOfWords.get(curr);
        if (p)
            return acc * p;
        return acc;
    }, posR);
    const n = words.reduce((acc, curr) => {
        const p = negativeProbabilityOfWords.get(curr);
        if (p)
            return acc * p;
        return acc;
    }, negR);
    return {
        "+": (p / (p + n)).toFixed(2),
        "-": (n / (p + n)).toFixed(2),
        "Class": p > n ? "+" : "-",
    };
}

const strs = ["I hated the poor acting", "I loved the story." , "I am now a fan"];

for (const str of strs) {
    console.log(`Classify Review: [${str}]\n`, classifyReview(str));
}

export { };