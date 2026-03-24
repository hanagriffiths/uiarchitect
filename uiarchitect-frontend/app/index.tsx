import LandingPage from "@/components/LandingPage";

export default function Index() {
  return (
    <LandingPage />
  );
}

// import * as React from 'react';
// import {createStaticNavigation} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import LandingPage from "@/components/LandingPage";
// import ComponentTree from '@/components/ComponentTree';

// const RootStack = createNativeStackNavigator({
//   screens: {
//     LandingPage: {
//       screen: LandingPage,
//       options: {title: 'Welcome'},
//     },
//     ComponentTree: {
//       screen: ComponentTree,
//     },
//   },
// });

// const Navigation = createStaticNavigation(RootStack);

// export default function App() {
//   return <Navigation />;
// }
