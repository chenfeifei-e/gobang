var can=document.getElementById("can");
var cxt=can.getContext("2d");
var me=true;
var box=[];
var count=0;
var wins=[];
var mywins=[];
var comwins=[];
for(var i=0;i<15;i++)
{   
	wins[i]=[];
	for(var j=0;j<15;j++)
	{
		wins[i][j]=[];
	}
}
for(var i=0;i<15;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[i][j+k][count]=true;
		}
		count++;
	}
}
for(var i=0;i<15;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[j+k][i][count]=true;
		}
		count++;
	}
}
for(var i=0;i<11;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
for(var i=0;i<11;i++)
{
	for(var j=14;j>3;j--)
	{
		for(var k=0;k<5;k++)
		{
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}
console.log(count);
for(var i=0;i<count;i++)
{
	mywins[i]=0;
	comwins[i]=0;
}
for(var i=0;i<15;i++)
{   
	box[i]=[];
	for(var j=0;j<15;j++)
	{
		box[i][j]=0;
	}
}

for(var i=0;i<15;i++)
{
	for(var j=0;j<15;j++)
	{
		cxt.beginPath();
		cxt.moveTo(i*30+15,15);
		cxt.lineTo(i*30+15,435);
		cxt.moveTo(15,j*30+15);
		cxt.lineTo(435,j*30+15);
		cxt.strokeStyle="gray";
		cxt.stroke();
		cxt.closePath();
	}
}

function qizi(i,j,me)
{
		cxt.beginPath();
		var gar=cxt.createRadialGradient(i*30+15,j*30+15,13,i*30+15,j*30+15,0);
		if(me)
		{
			gar.addColorStop(0,"#0a0a0a");
			gar.addColorStop(1,"#676366");
		}
		else{
			gar.addColorStop(0,"#d1d1d1");
			gar.addColorStop(1,"#f9f9f9");
		}
		cxt.fillStyle=gar;
		cxt.arc(i*30+15,j*30+15,13,0,2*Math.PI,true);
		cxt.fill();
		cxt.closePath();
	
}
can.onclick=function(e)
{
	var u=e.offsetX;
	var v=e.offsetY;
	var i=Math.floor(u/30);
	var j=Math.floor(v/30);
	if(!me)
	{
		return;
	}
		if(box[i][j]==0)
		{ 				
				qizi(i,j,me);
				box[i][j]=1;
				me=!me;
		}
			for(var k=0;k<count;k++)
			{
				if(wins[i][j][k])
				{
					mywins[k]++;
					comwins[k]=6;
				}
				if(mywins[k]==5)
				{
					console.log("niyingle")
				}
			}
		
		
	if(!me)
	{
		computerAI();
	}
	
	
}
function computerAI()
{
	var u=0;
	var v=0;
	var myscore=[];
	var comscore=[];
	var max=0;
	
	for(var i=0;i<15;i++)
		{
			myscore[i]=[];
			comscore[i]=[];
			for(var j=0;j<15;j++)
			{
				myscore[i][j]=0;
				comscore[i][j]=0;
			}
		}
	for(var i=0;i<15;i++)
	{
		for(var j=0;j<15;j++)
		{
			if(box[i][j]==0)
			{
				for(var k=0;k<count;k++)
				{
					if(wins[i][j][k])
					{
						if(mywins[k]==1)
						{
							myscore[i][j]+=200;
						}
						else if(mywins[k]==2)
						{
							myscore[i][j]+=400;
						}
						else if(mywins[k]==3)
						{
							myscore[i][j]+=2000;
						}
						else if(mywins[k]==4)
						{
							myscore[i][j]+=10000;
						}
						if(comwins[k]==1)
						{
							comscore[i][j]+=220;
						}
						else if(comwins[k]==2)
						{
							comscore[i][j]+=420;
						}
						else if(comwins[k]==3)
						{
							comscore[i][j]+=2200;
						}
						else if(comwins[k]==4)
						{
							comscore[i][j]+=20000;
						}
					}
				}
				if(myscore[i][j]>max)
				{
					u=i;
					v=j;
					max=myscore[i][j];
				}
				else if(myscore[i][j]==max)
				{
					if(comscore[i][j]>comscore[u][v])
					{
						u=i;
						v=j;
					}
				}
				if(comscore[i][j]>max)
				{
					u=i;
					v=j;
					max=comscore[i][j];
				}
				else if(comscore[i][j]==max)
				{
					if(myscore[i][j]>myscore[u][v])
					{
						u=i;
						v=j;
					}
				}
			}
			
			
		}
	}
	qizi(u,v,me);
	box[u][v]=2;
	me=!me;
	for(var k=0;k<count;k++)
	{
		if(wins[u][v][k])
		
		{
			comwins[k]++;
			mywins[k]=6;
		}
		if(comwins[k]==5)
		{
			console.log("计算机赢了");
		}
		
	}
	
}
