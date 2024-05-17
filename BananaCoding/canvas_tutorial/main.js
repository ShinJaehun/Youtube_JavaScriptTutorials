let canvas = document.getElementById('canvas')
let context=canvas.getContext("2d")
let window_height=window.innerHeight
let window_width=window.innerWidth
canvas.width=window_width
canvas.height=window_height
canvas.style.background="#ff8"

class Image{
    constructor(imagePath,xpos,ypos,width,height){
        this.imagePath=imagePath
        this.xpos=xpos
        this.ypos=ypos
        this.width=width
        this.height=height
    }
}

function createImage(context,imagePath,xpos,ypos,width,height){
    let myImage=document.createElement('img')
    myImage.src=imagePath
    myImage.onload=function(){
        context.drawImage(myImage,xpos,ypos,width,height)
    }
}

let image=new Image('person.jpg',50,50,200,200)
createImage(context,image.imagePath,image.xpos,image.ypos,image.width,image.height)


// class Circle {
//     constructor(xpos,ypos,radius,color, text, speed){
//         this.xpos=xpos
//         this.ypos=ypos
//         this.radius=radius
//         this.color=color
//         this.text=text
//         this.speed=speed
//         this.dx=1*this.speed
//         this.dy=1*this.speed
//     }

//     draw(context){
//         context.beginPath()

//         context.strokeStyle=this.color
//         context.textAlign="center"
//         context.textBaseline="middle"
//         context.font="20px Arial"
//         context.fillText(this.text,this.xpos,this.ypos)
//         context.lineWidth=5

//         context.arc(this.xpos,this.ypos,this.radius,0,Math.PI*2,false)
//         context.stroke()
//         context.closePath()
//     }

//     update(){
//         this.draw(context)

//         if((this.xpos+this.radius)>window_width){
//             this.dx=-this.dx
//         }

//         if((this.xpos-this.radius)<0){
//             this.dx=-this.dx
//         }

//         if((this.ypos+this.radius)>window_height){
//             this.dy=-this.dy
//         }

//         if((this.ypos-this.radius)<0){
//             this.dy=-this.dy
//         }

//         this.xpos+=this.dx
//         this.ypos+=this.dy
//     }
// }

// let getDistance = function(xpos1,ypos1,xpos2,ypos2){
//     let result=Math.sqrt(Math.pow(xpos2-xpos1,2)+Math.pow(ypos2-ypos1,2))
//     return result
// }

// let all_circles=[]

// let random_number=function(min,max){
//     let result=Math.random()*(max-min)-min
//     return result
// }

// for(let i=0;i<10;i++){
//     let radius=50
//     let random_x=random_number(radius,(window_width-radius))
//     let random_y=random_number(radius,(window_height-radius))

//     let my_circle=new Circle(random_x,random_y,radius,"black","A",10)
//     all_circles.push(my_circle)
// }

// let updateCircle = function(){
//     requestAnimationFrame(updateCircle)
//     context.clearRect(0,0,window_width,window_height)
//     all_circles.forEach(element=>{
//         element.update()
//     })
// }

// updateCircle()
