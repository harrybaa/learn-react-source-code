export default function (workInPhrase) {
    const rootFiber = workInPhrase._reactInternals;
    rootFiber.child && workOnNextFiber(rootFiber.child);
    debugger
}

const map = {

}

function workOnNextFiber(workingFiber) {
    // do work
    const { pendingProps, memoizedProps } = workingFiber;

    if (pendingProps.onClick && pendingProps.traceKey) {
        map[pendingProps.traceKey] = pendingProps.onClick;
 
        // pendingProps.onClick = function() {
        //     console.log('log extra');
        //     pendingProps.onClick(...arguments);
        // }

        // Object.defineProperties(pendingProps, {
        //     onClick: function () {
        //         console.log('log extra');
        //     }
        // });
        debugger
    }

    // recursive call
    workingFiber.child && workOnNextFiber(workingFiber.child);
    workingFiber.sibling && workOnNextFiber(workingFiber.sibling);
}