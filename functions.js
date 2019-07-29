function initialize()
{
	rangeOfDigits_values = [3,4,5,6,4,5,6,7,5,6,7,6,7,8,7,8,9,8,9,9];
	numOfDigits_values = [3,3,3,3,4,4,4,4,5,5,5,6,6,6,7,7,7,8,8,9];
	timeOnClock_values = [5,6,7,8,9,10,12,14,16,18,20,22,24,26,28,30,33,36,39,42];
	itemPrice = [1000,5000,50000,7000,14000,28000,3000,20000,75000];
	bagCapacity = [2,4,7];
	itemDescription = ["A lockpick has 1 use only and will reveal 1 random digit from the code.","Dynamite has 1 use only.  It will blow open a safe automatically.  However, a random amount of money inside the safe may be destroyed.","A lawyer has 1 use.  If the player is caught by the police, (s)he can buy his/her freedom and continue cracking safes. A player must have a lawyer in his/her possession when caught.","Holds 2 Items (Bags cannot hold other bags).","Holds 4 items (Bags cannot hold other bags).","Holds 7 items (Bags cannot hold other bags).","Will add 0 - 5 seconds to the clock.  Each time a magnet is used, there is a 10% chance that it will set off the alarm rather than add time.  There is also a 40% chance that the magnet will break and become unusable again.","The player can choose to escape at any time, regardless of whether or not the safe has been cracked.  A stealth suit has a lifetime of 1 – 4 uses (generated when bought) before it wears out and is unusable.","A Henchman will hold off the police while a safecracker continues to work on the safe.  A henchman can last anywhere from 1 - 6 turns against the police, giving the player that many more chances to crack the safe. After those turns are up the henchman surrenders and is hauled away. The Henchman will begin battling police as soon as the 3 turn grace period is up and the countdown to each henchman's surrender will begin.  If the player has more than one henchman in a bag, they will fight police separately so that only one will be captured at a time.  Once all of the henchmen are gone, the player is arrested."];
	
	LOCKPICK = 0, DYNAMITE = 1, LAWYER = 2, SMALL_BAG = 3, MEDIUM_BAG = 4, LARGE_BAG = 5, MAGNET = 6, STEALTH_SUIT = 7, HENCHMAN = 8;
	
	currentRound = 1;
	
	totalMoney = 0;
	inventoryMaxCapacity = 1;
	
	suitDurability = 0;
	
	numOfDigitsEntere = 0;
	
	
	items = ['LOCKPICK','DYNAMITE','LAWYER','SMALL BAG','MEDIUM BAG','LARGE BAG','MAGNET','STEALTHSUIT','HENCHMAN'];
	
	inventory = [];
	itemCounter = [0,0,0,0,0,0,0,0,0];
	numOfItems = 0;
	
	currentBag = 0;
	
	isFunctionEnabled = true;
	isLawyerFunctionEnabled = false;
	isThereSpace = true;
	doesHaveMoney = true;
	isAlarmSet = false;
	isSuitEquipped = false;
	
	runRound();
}

function runRound()
{
	isFunctionEnabled = true;
	isAlarmSet = false;
	isAfterAlarmAttempts = false;
	isCombinationGreater = null;
	isAfterAlarmAttempts = false;
	
	finalUserInput = "";
	
	digitsEntered = [];
	digitsEnteredCounter = 0;
	
	
	
	
	range = determineRange(currentRound);
	numOfDigits = determineNumOfDigit(currentRound);
	combination = generateCombination(numOfDigits,range);
	roundTime = determineTimeOnClock(currentRound);
	
	attempts = 0;
	afterAlarmAttempts = 3;
	
	createLockDigit_display(numOfDigits);
	createNumPad_display(range);
	
	updateTimeOnClock_display();
	updateStaticInfo_display();
	resetStoreMessage();
	
	//alert(combination);
	
	indexRevealed = [] //lockpick function
	lockPickUsed = 0;
	
	document.getElementById("gameInProgress_container").style.display = "inline-block";
	document.getElementById("itemMenu_container").style.display = "none";
	document.getElementById("gameOver_Container").style.display = "none";
	document.getElementById("messageBoxContainer").innerHTML = "";
}

function determineRange(round)
{
	if(round > 20)
	{
		return 9;
	}
	else
	{
		return rangeOfDigits_values[round -1];
	}
	
}

function determineNumOfDigit(round)
{
	if(round > 20)
	{
		return (round - 20) + 9;
	}
	else
	{
		return numOfDigits_values[round - 1];
	}
}

function createLockDigit_display(numOfDigits)
{	
	digitContainerObj = document.getElementById("lockDigitsContainer");
	digitContainerObj.innerHTML = "";
	for(var index = 0; index < numOfDigits; index++)
	{
		digitContainerObj.innerHTML += "<div class = 'lockDigits' id = 'lockDigits" + index + "'></div>"
	}
	
}

function createNumPad_display(range)
{
	numPadContainerObj = document.getElementById("numpadContainer");
	numPadContainerObj.innerHTML = "";
	for(var index = 1; index <= range; index++)
	{
		numPadContainerObj.innerHTML+="<button onclick = 'getInput(" + index + ");' class = 'numpadDigits'>" + index + "</button>";
		if(index%3 == 0)
		{
			numPadContainerObj.innerHTML+="<br/>";
		}
	}
}

function generateCombination(numOfDigits,range)
{
	var combination = "";
	for(var index = 0; index < numOfDigits; index++)
	{
		combination+=getRandomInteger(1,range);
	}
	
	return combination;
}

function getRandomInteger(lower, upper)
{
	multiplier = upper - (lower - 1);
	rnd = parseInt(Math.random() * multiplier) + lower;	
	return rnd;
}

function determineTimeOnClock(round)
{
	if(round > 20)
	{
		increment = (round - 20)*3;
		return (42 + increment) + getRandomInteger(0,round);
	}
	else
	{
		return timeOnClock_values[round - 1] + getRandomInteger(0,round);
	}
}

function getInput(num)
{
	if(digitsEnteredCounter < numOfDigits)
	{
		digitsEntered[digitsEnteredCounter] = num;
		digitsEnteredCounter++;
	}
	updateLock_display();
}

function updateLock_display()
{
	for(var index = 0; index < numOfDigits; index++)
	{
		if(digitsEntered[index] == null)
		{
			document.getElementById("lockDigits" + index).innerHTML = "";	
		}
		else
		{
			document.getElementById("lockDigits" + index).innerHTML = digitsEntered[index];
		}
	}		
}

function resetUserInput()
{
	userInput = "";
	digitsEntered = [];
	updateLock_display();
	digitsEnteredCounter = 0;
}

function updateTimeOnClock_display()
{
	document.getElementById("timeOutput").innerHTML = roundTime;
}

function submitUserInput()
{
	isValidInput = true;
	userInput = "";
	for(var index = 0; index < digitsEntered.length; index++)
	{
		if(digitsEntered[index] == null)
		{
			userInput+="";
		}
		else
		{
			userInput+=digitsEntered[index];
		}
	}
	if(userInput.length != numOfDigits)
	{
		isValidInput = false;
	}
	else
	{
		checkInput();
	}
	outputMessage_display();
	
}

function checkInput()
{
	if(isAlarmSet)
	{
		roundTime=-1;
		isAfterAlarmAttempts = true;
		outputMessage_display();
		updateTimeOnClock_display();
	}
	if(userInput == combination)
	{
		totalMoney += getMoney();
		currentRound++;
		
		updateStaticInfo_display();
		proceedToItemMenu_display();
		outputStoreMessage_display();
	}
	else
	{
		attempts++;
		//if(roundTime > 0 || afterAlarmAttempts >= 0)
		//{
			if(combination > parseInt(userInput))
			{
				isCombinationGreater = true;
			}
			else
			{
				isCombinationGreater = false;
			}
			
			roundTime-=getRandomInteger(0,attempts);
			if(roundTime <= 0)
			{
				isAfterAlarmAttempts = true;
				roundTime = 0;
				if(afterAlarmAttempts <= 0)
				{
					if(itemCounter[HENCHMAN] > 0) //henchman Function
					{
						currentHenchmanTurns = getRandomInteger(1,6);
						afterAlarmAttempts = currentHenchmanTurns;
						itemCounter[HENCHMAN]--;
						updateStaticInfo_display();
						outputMessage_display();
						updateTimeOnClock_display();
					}
					else
					{
						if(itemCounter[LAWYER] > 0)
						{
							if(!isFunctionEnabled)
							{
								outputStoreMessage_display();
							}
							else
							{
								itemCounter[LAWYER]--;
								numOfItems--;
								currentRound++;
								updateStaticInfo_display();
								proceedToItemMenu_display();
							}	
						}
						else
						{
							isGameOver = true;
							isLawyerFunctionEnabled = true;
							gameOverFuncton();
						}
						
					}
				}
				afterAlarmAttempts--;
			}
			//roundTime-=getRandomInteger(0,attempts);
		//}
		
		outputMessage_display();
		updateTimeOnClock_display();
	}
}

function gameOverFuncton()
{
	document.getElementById("gameInProgress_container").style.display = "none";
	document.getElementById("staticInfoContainer").style.display = "none";
	document.getElementById("gameOver_Container").style.display = "inline-block";
	document.getElementById("finalScore").innerHTML = totalMoney;
	//finalScore
}

function getMoney()
{
	return currentRound*(getRandomInteger(1,6)*100);
}

function outputMessage_display()
{
	if(!isValidInput)
	{
		document.getElementById("messageBoxContainer").innerHTML = "INVALID INPUT";
	}
	else
	{
		
		if(isCombinationGreater == null)
		{
			document.getElementById("messageBoxContainer").innerHTML = " ";
		}
		else
		{
			if(isCombinationGreater)
			{
				document.getElementById("messageBoxContainer").innerHTML = "Combination is greater.";
			}
			else 
			{
			document.getElementById("messageBoxContainer").innerHTML = "combination is smaller.";
			}
			if(isAfterAlarmAttempts)
			{
				document.getElementById("messageBoxContainer").innerHTML += " Police coming in " + (afterAlarmAttempts + 1);
			}
		}
		
		
	}
	
}

function resetStoreMessage()
{
	document.getElementById("storeMessage").innerHTML = "";
}

function proceedToItemMenu_display()
{
	document.getElementById("gameInProgress_container").style.display = "none";
	document.getElementById("itemMenu_container").style.display = "inline-block";
	isFunctionEnabled = false;
}

function showItemDescription(item)
{
	document.getElementById("itemPrice").innerHTML = "PRICE:$" + itemPrice[item];
	document.getElementById("itemDescription").innerHTML = itemDescription[item];
	document.getElementById("itemDescription_container").style.visibility = "visible";
}

function hideItemDescrption()
{
	document.getElementById("itemDescription_container").style.visibility = "hidden";
}

function getItem(item)
{
	isThereSpace = true;
	doesHaveMoney = true;
	if(totalMoney >= itemPrice[item])
	{
	
		if(item == SMALL_BAG || item == MEDIUM_BAG || item == LARGE_BAG)
		{
			if(currentBag == item)
			{
				return;
			}
			else
			{
				totalMoney-= itemPrice[item];
				inventoryMaxCapacity = bagCapacity[item - 3];
				currentBag = item;
			}
		}
		else
		{
			if(inventoryMaxCapacity > numOfItems)
			{
				if(item == STEALTH_SUIT)
				{
					if(!isSuitEquipped)
					{
						suitDurability = getRandomInteger(1,4);
						isSuitEquipped = true;
					}
				}
				totalMoney-= itemPrice[item];
				//inventory.push(item);
				itemCounter[item]++;
				numOfItems +=1;
			}
			else
			{
				isThereSpace = false;
			}
		}
	}
	else
	{
		doesHaveMoney = false;
	}
	outputStoreMessage_display();
	updateStaticInfo_display();
}

function outputStoreMessage_display()
{
	document.getElementById("storeMessage").innerHTML ="";
	if(!isThereSpace)
	{
		document.getElementById("storeMessage").innerHTML += "CAN NOT CARRY MORE ITEMS.";
	}
	if(!doesHaveMoney)
	{
		document.getElementById("storeMessage").innerHTML += "YOU DO NOT HAVE ENOUGH MONEY TO PURCHASE THE ITEM.";
	}
	if(!isFunctionEnabled)
	{
		document.getElementById("storeMessage").innerHTML += "ITEMS CURRENTLY UNUSABLE";
	}
	
}

function updateStaticInfo_display()
{
	document.getElementById("inventory").innerHTML = "";
	document.getElementById("maxCapacity").innerHTML = inventoryMaxCapacity;
	document.getElementById("totalMoneyOutput").innerHTML = totalMoney;
	document.getElementById("currentRoundOutput").innerHTML = currentRound;
	for(index = 0; index < itemCounter.length; index++)
	{
		if(itemCounter[index] > 0)
		document.getElementById("inventory").innerHTML += "<div class = 'itemsInInventory' onclick = " + items[index] + "_function();>" +items[index] + "x" + itemCounter[index] + "</div>";	
	}
}

function LOCKPICK_function()
{
	if(!isFunctionEnabled)
	{
		outputStoreMessage_display();
	}
	else
	{
		if(lockPickUsed < numOfDigits)
		{
			doesContain = true;
			itemCounter[LOCKPICK]--;
			numOfItems--;
			while(doesContain)
			{
				indextoReveal = getRandomInteger(0,combination.length - 1);
				if(indexRevealed.indexOf(indextoReveal) == -1)
				{
					doesContain = false;
					indexRevealed.push(indextoReveal);
				}
			}
			digitsEntered[indextoReveal] = combination.charAt(indextoReveal);
			
			
			lockPickUsed++;
			revealIndex_display();
			updateStaticInfo_display();
		}
		else
		{
			return;
		}	
	}
}

function revealIndex_display()
{
	for(var index = 0; index < indexRevealed.length; index++)
	{
		document.getElementById("lockDigits" + indexRevealed[index]).innerHTML = combination.charAt(indexRevealed[index]);
	}
}

function DYNAMITE_function()
{
	if(!isFunctionEnabled)
	{
		outputStoreMessage_display();
	}
	else
	{
		itemCounter[DYNAMITE]--;
		numOfItems--;
		moneyDestroyed = getMoney() - getMoney();
		if(moneyDestroyed <= 0)
		{
			moneyDestroyed = 0;
		}
		totalMoney += moneyDestroyed;
		currentRound++;
		
		updateStaticInfo_display();
		proceedToItemMenu_display();
	}
}

function LAWYER_function()
{
	
}

function MAGNET_function()
{
	if(!isFunctionEnabled)
	{
		outputStoreMessage_display();
	}
	else
	{
		if(getRandomInteger(0,100)<=10)
		{
			isAlarmSet = true;
			
		}
		else
		{
			roundTime+=getRandomInteger(0,5);
		}
		if(getRandomInteger(0,100)<=40)
		{
			itemCounter[MAGNET]--;
			numOfItems--;
			updateStaticInfo_display();
			updateTimeOnClock_display();
		}
	}
}

function STEALTHSUIT_function()
{
	if(!isFunctionEnabled)
	{
		outputStoreMessage_display();
	}
	else
	{
		if(isSuitEquipped)
		{
			suitDurability--;
			if(suitDurability == 0)
			{
				itemCounter[STEALTH_SUIT]--;
				numOfItems--;
			}
			updateStaticInfo_display();
			proceedToItemMenu_display();
			
		}
	}
}

function HENCHMAN_function()
{
	
}