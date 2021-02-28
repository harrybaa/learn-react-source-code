let wipRoot = null;

function render(vnode, container) {
    // console.log(vnode);
    // const node = createNode(vnode);
    // container.appendChild(node);
    wipRoot = {
        type: 'div',
        props: {
            children: vnode,
        },
        stateNode: container,
    };

    nextUnionOfWork = wipRoot;
}

function createNode(workInProgress) {
    const { type, props } = workInProgress;

    if (type && typeof type === 'string') {
        const node = document.createElement(type);
        console.log('node', workInProgress, node)
        updateProps(node, props);
    
        return node;
    }
}

// 原生标签节点
function updateHostNode(workInProgress) {
    const { type, props } = workInProgress;

    if (!workInProgress.stateNode) {
        workInProgress.stateNode = createNode(workInProgress);
    }
    // const node = document.createElement(type);
    // updateProps(workInProgress, props);
    reconcileChildren(workInProgress, props.children);

    console.log('workInProgress', wipRoot);
    return workInProgress;
}

// hooks组件
function updateFunctionNode(vNode) {
    const { type, props } = vNode;
    const vvNode = type(props);
    const node = createNode(vvNode);
    return node;
}

function updateClassNode(vNode) {
    const { type, props } = vNode;
    const instance = new type(props);
    const vvNode = instance.render();
    const node = createNode(vvNode);
    return node;
}

// 文本
function updateTextNode(vNode) {
    const node = document.createTextNode(vNode);
    return node;
}

function updateProps(node, nextprops) {
    Object.keys(nextprops)
        // .filter(key => key !== 'children')
        // .forEach(key => node[key] = nextprops[key]);
        .forEach(key => {
            const value = nextprops[key];
            if (key === 'children') {
                if (typeof value === 'string') {
                    node.textContent = value;
                }
            } else {
                node[key] = value;
            }
        });
}

function reconcileChildren(workInProgress, children) {
    if (!children) {
        return;
    }

    let childArr = Array.isArray(children) ? children : [children];
    // childArr.forEach(child => {
    //     const childNode = createNode(child);
    //     node.appendChild(childNode);
    // });
    let prevFiber = null;
    for (let i = 0; i < childArr.length; i++) {
        const thisChild = childArr[i];
        const newFiber = {
            type: thisChild.type,
            props: { ...thisChild.props },
            stateNode: null,
            child: null,
            sibling: null,
            return: workInProgress
        };

        if (i === 0) {
            workInProgress.child = newFiber;
        } else {
            prevFiber.sibling = newFiber;
        }
        prevFiber = newFiber;
    }
}

// fiber
let nextUnionOfWork = null;

// fiber js对象
// type
// sibling
// child
// stateNode
// return

function preformNextWork(workInProgress) {
    // work 1: 执行任务
    const { type } = workInProgress;
    if (typeof type === 'string') {
        updateHostNode(workInProgress);
    }

    // work 2: 返回下一个执行任务
    if (workInProgress.child) {
        return workInProgress.child;
    } else {
        let currentNode = workInProgress;
        while (currentNode) {
            if (currentNode.sibling) {
                return currentNode.sibling;
            }
            currentNode = currentNode.return;
        }
    }
}

function workLoop(IdleDeadline) {
    while (nextUnionOfWork && IdleDeadline.timeRemaining() > 1) {
        nextUnionOfWork = preformNextWork(nextUnionOfWork);
    }

    // submit
    if (!nextUnionOfWork) {
        submitRoot();
    }
}

function submitRoot() {
    submitWork(wipRoot.child);
    wipRoot = null;
}

function submitWork(workInProgress) {
    if (!workInProgress) {
        return;
    }
    
    const parentFiber = workInProgress.return;
    const parentNode = parentFiber.stateNode;
    if (parentNode && workInProgress.stateNode) {
        parentNode.appendChild(workInProgress.stateNode);
    }

    submitWork(workInProgress.child);
    submitWork(workInProgress.sibling);
}

requestIdleCallback(workLoop);

const ReactDOM = {
    render,
}

export default ReactDOM;