"use client";

// this component will be called each time we call throw Error("...") automatically
// no need to call it in the component, because we create it here (in app) with this name (error)

export default function ErrorPage() {
    return <div>Something went wrong, Please refresh the page</div>
}