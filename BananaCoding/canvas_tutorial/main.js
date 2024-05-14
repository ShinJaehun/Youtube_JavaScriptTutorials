let canvas = document.getElementById('canvas')
let context=canvas.getContext("2d")
let window_height=window.innerHeight
let window_width=window.innerWidth
canvas.width=window_width
canvas.height=window_height
canvas.style.background="#ff8"
// context.fillRect(300, 0, 100, 200)
// context.fillStyle="red"
// context.fillRect(100, 500, 100, 100)
// context.beginPath()
// context.strokeStyle="blue"
// context.lineWidth=20
// context.arc(100, 100, 50, 0, Math.PI*2,false)
// context.stroke()
// context.closePath()

class Circle {
    constructor(xpos,ypos,radius,color){
        this.xpos=xpos
        this.ypos=ypos
        this.radius=radius
        this.color=color
    }

    draw(context){
        context.beginPath()
        context.lineWidth=5
        context.arc(this.xpos,this.ypos,this.radius,0,Math.PI*2,false)
        context.stroke()
        context.closePath()
    }
}


let all_circles=[]
let createCircle = function(circle){
    circle.draw(context)
}
for(let i=0;i<10;i++){
    let random_x=Math.random()*window_width
    let random_y=Math.random()*window_height

    let my_circle=new Circle(random_x,random_y,50,"red")
    all_circles.push(my_circle)
    createCircle(all_circles[i])
}

// let my_circle1=new Circle(100,100,50,"red")
// let my_circle2=new Circle(200,200,50,"black")

// my_circle1.draw(context)
// my_circle2.draw(context)
