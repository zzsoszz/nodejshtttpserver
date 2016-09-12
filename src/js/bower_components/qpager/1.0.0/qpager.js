function Pager(totalpage)
{
	//当前页
	this.curpage=1;
	//每页多少个元素
	this.totalpage=totalpage;
	//总页数
	this.pagearray=[];
	
	this.go=function(page)
	{
		if(page>totalpage)
		{
			return;
		}
		this.pagearray=[];
		if(totalpage>9)
		{
			var leftsize=(page-2)>=3?3:(page-2);//左边显示多少个
			var rightsize=(this.totalpage-page-1)>=3?3:(this.totalpage-page-1);//右边显示多少个
			var allsize=leftsize+rightsize+1;//总共显示多少个
			var start=page-leftsize;
			
			this.pagearray.push(1);
			if(leftsize==3)
			{
				this.pagearray.push(-1);//按照顺序排列
			}
			for(var i=0;i<allsize;i++)
			{
				this.pagearray.push(start++);//按照顺序排列
			}
			if(rightsize==3)
			{
				this.pagearray.push(-1);//按照顺序排列
			}
			this.pagearray.push(totalpage);
		}else{
			var start=1;
			for(var i=0;i<totalpage;i++)
			{
				this.pagearray[i]=start++;//按照顺序排列
			}
		}
		this.curpage=page;
	};
	this.isHead=function()
	{
		if(this.curpage==1)
		{
			return true;
		}else{
			return false;
		}
	};
	this.prev=function()
	{
		if(this.isHead())
		{
			return 1;
		}else{
			this.curpage--;
		}
		this.go(this.curpage);
		return this.curpage;
	};
	this.next=function()
	{
		if(!this.isEnd())
		{
			this.curpage++;
		}
		this.go(this.curpage);
		return this.curpage;
	};
	
	
		this.isEnd=function()
		{
			if(this.curpage==this.totalpage)
			{
				return true;
			}else{
				return false;
			}
		};
		this.moveToHead=function()
		{
			this.curpage=1;
			return this.curpage;
		};
		this.moveToEnd=function()
		{
			this.curpage=this.totalpage;
			return this.curpage;
		};
		
		
	this.init=function()
	{
		this.go(1);
	};
	this.init();
}
;

/*
var pager=new Pager(7);
pager.go(3);
console.log(pager.pagearray);
pager.go(4);
console.log(pager.pagearray);
pager.go(5);
console.log(pager.pagearray);
*/
