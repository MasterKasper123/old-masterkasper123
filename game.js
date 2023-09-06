const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "You wake up in a strange place and there is a rotten banana in front of you.",
    options: [
      {
        text: 'Take the rotten banana',
        setState: { rottenBanana: true },
        nextText: 2
      },
      {
        text: 'Leave the banana',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "You don't know where you are, so you start to explore your surroundings. To your surprise you're in the middle of a desert. After a while you meet a sus salesman on a white horse.",
    options: [
      {
        text: 'Trade the rotten banana for a sword',
        requiredState: (currentState) => currentState.rottenBanana,
        setState: { rottenBanana: false, sword: true },
        nextText: 3
      },
      {
        text: 'Trade the banana for a shield',
        requiredState: (currentState) => currentState.rottenBanana,
        setState: { rottenBanana: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignore the salesman',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'You leave the salesman and start to follow a small road. After a while you start to feel tired and the road leads you to a crossing. One road leads to a small village, another to a really big and epic sandstone temple and the third to a deep and sinister-looking forest made of holy banana trees.',
    options: [
      {
        text: 'Explore the Epic Temple',
        nextText: 4
      },
      {
        text: 'Find a room to sleep in at the village',
        nextText: 12
      },
      {
        text: 'Find some hay in a stable to sleep in',
        nextText: 6
      },
      {
        text: 'Explore the sinister banana forest',
        nextText: 17
      }
    ]
  },
  {
    id: 4,
    text: "Tired and with hurting legs you walk into the temple. There you find a big chest made of tree. You figure that's a good place to sleep. So you open the chest, and that's the last thing you ever do.",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into one of the rooms in the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: "You wake up, well rested and ready to take on the next day.",
    options: [
      {
        text: 'Explore the temple',
        nextText: 7
      },
      {
        text: 'Explore the sinister banana-forest',
        nextText: 18
      }
    ]
  },
  {
    id: 7,
    text: "You enter the big temple, feeling excited, maybe a little too excited. After only a few minutes you're lost in a maze of tunnels and rooms with ancient paintings and curses on the walls. You're walking down a hallway when you see two rooms. One of the room is full of diamonds and riches and the other is empty except for a wooden chest, painted in red, blue and yellow dye.",
    options: [
      {
        text: 'Walk into the room with diamonds',
        nextText: 8
      },
      {
        text: 'Explore the chest',
        nextText: 21
      }
    ]
  },
  {
    id: 8,
    text: "You walk into the room, amazed by all the precious and beautiful diamonds. This chamber is stunning. How can all these diamonds have been missed by previous treasure hunters, you wonder. And that's when you see the hole. In the middle of the room there is a big hole in the floor, it looks a little bit like the type of hole you dig when you're making a well. You hear some mysterious sounds coming out of the dark hole, so you walk closer. You stand right by the pit and look down into it. You can't see the bottom of the hole because it has a slight curve, but you can see a green light shining up from somewhere down there.",
    options: [
      {
        text: 'Jump into the hole',
        nextText: 13
      },
      {
        text: 'Slowly back away from the hole',
        nextText: 14
      }
    ]
  },
  {
    id: 9,
    text: "As you take take out your sword to defend yourself, the monster immediately tries to strike the sword from your hands, but the sword is really sharp and your reflexes are quick, so you manage to cut one of the monsters arms in half. The monster screams and because of that first hit you manage to defeat the terrible beast of evil. Now that you've seen what kind of creatures that lurk in this temple the only thing you wanna do is leave. Unfortunately, you now realise that there is no exit to this room and that the noise you heard before was the opening beeing sealed by a giant boulder of granite. You try to push it out of the way, but you can't even move it a centimeter. The only other way leading out of this room is through the hole in the floor where there must be something that is emitting the mysterious green light.",
    options: [
      {
        text: 'Throw the rotten banana into the hole',
        requiredState: (currentState) => currentState.rottenBanana,
        nextText: 11
      },
      {
        text: "Jump into the hole",
        nextText: 13
      }
    ]
  },
  {
    id: 10,
    text: "You try to hide behind your shield, but the monster easily grabs it out of your hand, and with no defence left, this is where your journey ends.",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: "You drop the banana into the hole, and it slides down the side of the pit. After ten meters you can't see it anymore because of the hole is so curved, but you still hear it slide rapidly down the hole. You hear it hit the bottom, and shortly after that you hear A LOT of buzzing and squeaking. It sounds like you've just woken up an enormous tribe of insects. After a while of nervous waiting, the sounds slowly start to stop and even the green light starts to go out. After about five minutes all sounds have stopped and the green light is gone. Now the only thing left to do is to jump down into the hole.",
    options: [
      {
        text: 'Jump into the hole',
        nextText: 15
      }
    ]
  },
  {
    id: 12,
    text: "You don't have any money so you can't rent a room in the village's only inn.",
    options: [
      {
        text: 'Try to secretly break into one of the empty houses in the village',
        nextText: 5
      },
      {
        text: 'Trade the rotten banana for a room instead of money.',
        requiredState: (currentState) => currentState.rottenBanana,
        setState: { rottenBanana: false},
        nextText: 6
      },
      {
        text: 'Trade the sword for a room instead of money.',
        requiredState: (currentState) => currentState.sword,
        setState: { sword: false},
        nextText: 6
      },
      {
        text: 'Trade the wooden shield for a room instead of money.',
        requiredState: (currentState) => currentState.shield,
        setState: { shield: false},
        nextText: 6
      }
    ]
  },
  {
    id: 13,
    text: "You fall down about twenty meters and the only thing stopping you from dying from fall damage is the fact that the fall isn't straight. You get slung into the walls many times as you fall down into the nest of thousands of surprised orange-brown colored insects the size of a child's fist. You're already hurt from the fall and the bugs are way to many for you to handle. Is this how your adventure finally ends, overwhelmed by buzzing, banana intolerant bugs that look like they're taken straight out of a horror movie after you decided to jump into a deep and evil-looking hole inside of an ancient temple all alone?",
    options: [
      {
        text: "You get eaten up by bugs, restart.",
        nextText: -1
      }
    ]
  },
  {
    id: 14,
    text: "You slowly start to back away from the hole, step by step. Watching the hole carefully as if it's about to explode, you walk backwards towards the exit of the room. When you're almost out of the room you hear a noise behind you. You turn around and you scream out loud as you see the entity that made the sound. In front of you, blocking the exit of the room, is the most horrible and scary monster ever imaginable. At least 2.5 meters tall and with long, slim and partly rotten arms and legs. It's a miracle that you don't immediately faint when you see the furious beast preparing for an attack.",
    options: [
      {
        text: "Jump into the hole",
        nextText: 13
      },
      {
        text: 'Attack the monster with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      }
    ]
  },
  {
    id: 15,
    text: "You slide down the side of the hole, just like your banana did, and when you hit the bottom, you are standing in the middle of the nest of thousands of deadly big insects. However, they all seem to be sleeping. You see the banana you threw in earlier and putting together two and two, you come to the conclusion that the bad smell of the banana made the bugs fall asleep. You have no idea of how long they will sleep so you quickly begin to search for an exit, logically these bugs must have some kind of way to get outside to get food. After a few minutes of searching you finally find the exit. It's a circular tunnel and it's only about one meter in diameter. When you look into it you can't see the end of it. Although it would be very VERY scary to crawl through it, you probably would make it, IF that is, is actually leads to the surface outside of the temple.",
    options: [
      {
        text: "Crawl through the tunnel and hope for the best",
        nextText: 16
      }
    ]
  },
  {
    id: 16,
    text: "You start to crawl through the tight tunnel, and it's the worst experience of your entire life. It feels like it's never gonna end and it feels like you're gonna get stuck and lie in this tunnel forever. Luckily, that's not the case and after about half an hour of crawling you finally reach the end of the tunnel. The tunnel ends in a nearby cave and you're finally free from this terrible ancient building. As you breathe in the fresh air you swear to never enter the tomb ever again. You go to the village and tell everyone your story and you become thier hero. The monster that you defeater had been threatening them for years and they get really happy when you tell them that it's dead. And then you live happily for the rest of your life.",
    options: [
      {
        text: 'Congratulations for winning the game! Play again?',
        nextText: -1
      }
    ]
  },
  {
    id: 17,
    text: "You enter the forest although you feel very tired and would like to sleep. You have a very bad feeling about this. You follow the road about 500 meters into the forest. The forest is very dense and all the big banana trees make it very dark this far into the forest. You start to hear weird sounds around you. You think it's just imagination, so you continue on deeper into the forest. When you are about one mile into the forest you hear quick footsteps behind you. You turn around, scared, but you can't see anything in the dark. The footsteps continue, faster and faster, closer and closer. You get scared and try to run away from the thing that's running towards you, but that's when you run straight into a big banana tree. You faint, and get killed by the evil banana man that hates all humans.",
    options: [
      {
        text: 'You lost, restart?',
        nextText: -1
      }
    ]
  },
  {
    id: 18,
    text: "You enter the forest, and the first thing you notice is the bad smell. But since you're full of energy from having such a good sleep last night, you don't care about the smell. You walk further into the forest with confidence in your legs. The road continues into the forest and you follow it. When you're about one mile in, you see a dark figure about 50 meters away from you on the road. You stop walking, and start to take a closer look at it. It looks like a ghost of some sort. While you're observing the banana deamon, it suddenly turns around and spots you. It lets out a horrifying scream, and start to walk towards you with a scythe in it's hands.",
    options: [
      {
        text: 'RUN BACK OUT OF THE FOREST',
        nextText: 19
      },
      {
        text: "Take the risk to quickly grab a banana from one of the trees before you run out of the forest",
        setState: { rottenBanana: true},
        nextText: 20
      },
      {
        text: "Walk towards the figure in an attempt to befriend it.",
        nextText: 22
      }
    ]
  },
  {
    id: 19,
    text: "You run as fast as possible away from the scary phantom and you manage to outrun it. When you're outside of the forest it can't reach you anymore. Now that you have been in the forest, you're excited to explore the desert temple, or is it catacombs? ",
    options: [
      {
        text: 'Enter the temple',
        nextText: 7
      }
    ]
  },
  {
    id: 20,
    text: "You actually manage to grab a banana before you flee as fast as possible away from the scary phantom and you manage to outrun it. When you're outside of the forest it can't reach you anymore. Now that you have been in the forest, you're excited to explore the desert temple, or is it catacombs? ",
    options: [
      {
        text: 'Enter the temple',
        nextText: 7
      }
    ]
  },
  {
    id: 21,
    text: "You walk into the room with the chest, and when you get closer to the chest you see that it's painted in red, yellow and blue. You get a really bad feeling about this chest, but your curiousity takes the upper hand. You open up the chest and inside is a mummy. You get a jumpscare and then the mummy kills you.",
    options: [
      {
        text: "You died, restart.",
        nextText: -1
      }
    ]
  },
  {
    id: 22,
    text: "You start to walk towards the banana man and try to look friendly. You raise your hands to show that you will not hurt it, but it just continues to run towards you with the scythe. When the distance between you and the figure is only five meters you realize that it's not gonna stop, but it's already way to late. The angry creature attacks you and you become the next victim of the infamous banana man.",
    options: [
      {
        text: "The banana man ate you, restart",
        nextText: -1
      }
    ]
  }

]
startGame()
