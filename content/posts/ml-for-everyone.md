---
title: "Machine Learning For the Masses (and How to Retrain GPT-2)"
date: 2019-09-22
draft: true
---

This assumes the reader is on the Windows operating system, but much of the information is relevant to any other OS.

The initial aim of this post was solely a step-by-step guide to retrain GPT-2 using a custom dataset, but I will also ponder on the future of AI and machine learning (not on its progress per se but on how *we* will interact with it, in the future).

Thanks to Ng Wai Foong for [this](https://medium.com/@ngwaifoong92/beginners-guide-to-retrain-gpt-2-117m-to-generate-custom-text-content-8bb5363d8b7f) useful guide on training GPT-2 that helped me a lot.

# GPT-2

> *the model too risky to be released*

We'll be looking at how to retrain the well-known GPT-2 model on our own dataset of choice. The aim is for the model to learn the patterns of any text that you provide it.
This requires zero technical knowledge or any background in ML, although some basic git and python experience might be useful to debug any problems you may have.

## Your Dataset
Before we begin it's best to discuss what text is best to provide it. If you've already decided what you want to train it on, you can just collect that text and paste it into a text file.
I would also recommend separating the examples with `<|endoftext|>`, like below:

> *(Excerpt from my dataset text file)*

```
And all my days are trances,
And all my nightly dreams
Are where thy grey eye glances,
And where thy footstep gleams-
In what ethereal dances,
By what eternal streams.

<|endoftext|>

The skies they were ashen and sober;
The leaves they were crisped and sere-
The leaves they were withering and sere;
It was night in the lonesome October
Of my most immemorial year;
It was hard by the dim lake of Auber,
In the misty mid region of Weir-
It was down by the dank tarn of Auber,
In the ghoul-haunted woodland of Weir.

...
```

I trained GPT-2 on poems written by Edgar Allen Poe. I was curious to see if it could replicate his style (which is fairly distinct).
I would recommend training it on something a little simpler and in the modern English language. Unless you have a particularly powerful computer, it will take a while for it to learn the structure and semantics of your text.
However, the model we will use is already pretrained on text found on the internet, so it will pick up conventional English quickly.

# Getting GPT-2

We're going to be getting a ['fork' of the original](https://github.com/nshepperd/gpt-2) GPT-2 from @nshepperd (since the original GPT-2 is considered archived, with no updates expected):

1. Follow the [link](https://github.com/nshepperd/gpt-2).
2. Press the green 'Clone or download' button and select 'Download ZIP'.
3. Extract the contents of the ZIP to any location, and open up the folder.
4. Since, I was training it on a windows machine (which makes it inconvenient to modify the PATH variable), I instead copied the files *encode.py* and *train.py* into the *src* folder.

# Python Setup


First check if you already have python:

1. Open up the command line, cmd or powershell.
2. Enter the command: `python --version`
3. If you get an error message then you should install it as explained below, else skip to the next heading.

It's pretty easy to get python just install it from the [website](https://www.python.org/downloads/) and make sure you select *add python and/or pip to the (system) path* (or alternative phrasing)  during the installation process so you can run it from the command line.

## Python Modules

We now need to satisfy any dependencies for the code. The best way would be to install it using the requirements.txt file amongst the files you downloaded.

1. Find the *requirements.txt* file amongst the downloaded files.
2. Assuming you used the standard windows 10 file manager, hold *SHIFT* and press *RIGHT-CLICK* - not on a file, but anywhere amongst the empty space below the list of files.
3. Select *Open Powershell Window*.
4. Enter the command: `pip install -r ./requirements.txt`

It's possible you recieved an error message. If so, read the output and try to resolve any missing dependencies (using a Google search).
If it still doesn't work, you could just manually install the four required modules. Enter these commands one at a time:

```shell
pip install fire
pip install regex
pip install requests
pip install tqdm
```
in the command line. This is less preferred in case the requirements change, but in that case you could just look at what's in the requirements.txt file and install the relevant modules.

# Final Setup

Nearly about to start training just a few more steps...

1. Copy your text file with the dataset inside into the *src* folder.
2. Open up powershell inside this folder like you did before.
3. Enter the command: `python encode.py dataset.txt dataset.npz` (this encodes the dataset so the model can read it)
...where dataset.txt is your dataset text file. It can be called anything, just make sure to modify the above command to match the name of the file.

## Getting the 117M model

1. Find the file download_model.py amongst the installed files.
2. Open up powershell in this folder.
3. Enter command: `python download_model.py 117M`

# Training

Finally, it's time to train the model. It will take a fair bit of resources and slow down performance if you are doing anything else while training. It's best to just leave it to train and not use the computer.

Open up powershell in the folder that contains your encoded dataset and enter the following command:
```shell
python train.py --dataset dataset.npz --sample_every 50 --sample_num 2
```
You can change '2' to any number of samples you want to generate as you train it. Generating samples while you train allows you to see the progress of the model.
Press *CTRL+C* to stop the training. Technically, it *pauses*, since you can just run the command again and it will pick up where it left off (as long as you didn't change any of the files).

That's about it, you now have the ability to generate as many samples as you'd like while training. There are some more steps that you could go through once you have your perfect model that would allow you to generate more samples *without* training. However, it is unlikely you will reach a perfect model, so for the purposes of this post what we have covered is sufficient. I also find it more interesting to generate and view samples as it trains, allowing me to see its progress with each iteration.

# For the masses?

It is clear that, similar to the widespread proliferation of information - and the number of people that have access to it - the internet will (and mostly has) enable(d) billions of people to utilise machine learning technologies. However, as we have just worked through, the process is a bit fiddly and not amazingly effective. 

Hmm... just like a lot of early tech that we take now take for granted. 

It seems to me that the next step of ML/AI technology is not some breakthrough that will allow Skynet-like AI roaming around, but instead for there to be a set of tools that completely abstract much of the 'fiddly' setup and implementation that is currently required to generate samples. 

If such tools existed (which would be used in a similar fashion to current alternatives like TensorFlow or Keras), opportunities would arise for specialist 'trainers' who would be able to fine tune parameters to produce optimal samples.

The ML community would be split into, firstly, the mathematicians focusing on the matrix crunching that goes behind training models, and secondly, trainers who are effective at the art of finetuning parameters, which is a different skill. 

It could also open the possibility of companies selling pre-trained models suited to do a particular task, with paying customers using the model to generate samples to their heart's content (possibly even hiring a trainer to do it for them if they want better results).

As a result, copyright law would likely append an unusual provision - one may not use a sample outside the uses stated in the user licence agreement provided by the company which sold the model. This would tackle the problem of people perhaps selling novels generated with the model, when the company actually only sold it to customers for personal use/entertainment.

It sparks up the (now tiresome to many) question of data ownership.
If I sell you a model trained on Stephen King's novels, and you generate a 600-page sample that reads like one of Stephen King's works, who owns the sample? Do you (the consumer), the company or Stephen King himself own it? 

## Closing

These are my opinions/predictions on the future of (our interaction with) ML/AI. I believe things will be simplified before we advance. Taking a step back, before another two forward, if you will. As a first year CS student, I do not know precisely how feasible my statements are, because I am not an expert (yet), but I plan to return this topic in the future and see how accurate I was.
