import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AccountScreen } from "./AccountScreen";
import { AuthScreen } from "./AuthScreen";
import { CategoriesScreen } from "./CategoriesScreen";
import { CollectionScreen } from "./CollectionScreen";
import { ChannelsScreen } from "./ChannelsScreen";
import { DiscoverScreen } from "./DiscoverScreen";
import { FilmScreen } from "./FilmScreen";
import { LandingScreen } from "./LandingScreen";
import { OnboardingScreen } from "./OnboardingScreen";
import { SearchScreen } from "./SearchScreen";
import { ErrorScreen, NotFoundScreen } from "./StatusScreens";
import { WatchlistScreen } from "./WatchlistScreen";
import { getCatalog } from "@/mocks/catalog";
import { figmaScreen } from "@/components/_shared/figma";

// Full key screens composed from the library, one story per design screen on "2 Key Screens". Storybook is English
// only: every screen renders its English default; the German app routes pass locale="de".
const meta = {
  title: "Screens/Key screens",
  // Compositions, not components: kept out of the component manifest (the rules page points agents at src/screens).
  tags: ["!manifest"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    function Page(Story) {
      return (
        <div className="flex min-h-screen flex-col bg-black">
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** "discover | 1440" */
export const Discover: Story = { parameters: figmaScreen("Discover | desktop"), render: () => <DiscoverScreen /> };
/** "channels | 1440" */
export const Channels: Story = { parameters: figmaScreen("Channels | desktop"), render: () => <ChannelsScreen /> };
/** "Genres | 1440px" */
export const Genres: Story = { parameters: figmaScreen("Genres | desktop"), render: () => <CategoriesScreen /> };
/** "single film view | 1440" */
export const Film: Story = { parameters: figmaScreen("Film | desktop"), render: () => <FilmScreen /> };
/** "collection view | list | 1440" */
export const CollectionList: Story = { parameters: figmaScreen("Collection · list | desktop"), render: () => <CollectionScreen /> };
/** "collection view new | Grid | 1440" */
export const CollectionGrid: Story = { parameters: figmaScreen("Collection · grid | desktop"), render: () => <CollectionScreen defaultView="grid" /> };
/** "collection view | list | expanded text | 1440" */
export const CollectionExpanded: Story = { parameters: figmaScreen("Collection · list · expanded text | desktop"), render: () => <CollectionScreen defaultExpanded /> };
/** "search results | Static | 1440px": suggestions and feeds before a query. */
export const Search: Story = { parameters: figmaScreen("Search Overlay | desktop"), render: () => <SearchScreen /> };
/** "search results | Sticky in-nav | 1440px" and "| 393px": results for a query. */
export const SearchResults: Story = { parameters: figmaScreen("Search Results | desktop"), render: () => <SearchScreen defaultQuery="Drama" /> };
/** "No results for" + hint, production strings. */
export const SearchNoResults: Story = { render: () => <SearchScreen defaultQuery="Kubrik" results={[]} /> };
/** "login | 1440px" / "login | 393px" */
export const Login: Story = { parameters: figmaScreen("Login | desktop"), render: () => <AuthScreen /> };
/** "signup with product card | 1440px" / "Signup | 393px" */
export const Signup: Story = { parameters: figmaScreen("Signup · product card | desktop"), render: () => <AuthScreen defaultMode="signup" product="monthly" /> };

/** "Landing Page EN | 1440w" (4 Sooner DE Marketing Pages) */
export const Landing: Story = { parameters: figmaScreen("Landing Page | EN | desktop"), render: () => <LandingScreen /> };

/** "onboarding EN | 1440" (4 Sooner DE Marketing Pages) */
export const Onboarding: Story = { parameters: figmaScreen("Plan Select | EN | desktop"), render: () => <OnboardingScreen /> };

/** "Account · Profile" (production /en/account) */
export const AccountProfile: Story = { parameters: figmaScreen("Account · Profile | EN | desktop"), render: () => <AccountScreen section="profile" /> };
/** "Account · Settings" */
export const AccountSettings: Story = { parameters: figmaScreen("Account · Settings | EN | desktop"), render: () => <AccountScreen section="settings" /> };
/** "Account · Subscriptions" */
export const AccountSubscriptions: Story = { parameters: figmaScreen("Account · Subscriptions | EN | desktop"), render: () => <AccountScreen section="subscriptions" /> };
/** "Account · Rentals" */
export const AccountRentals: Story = { parameters: figmaScreen("Account · Rentals | EN | desktop"), render: () => <AccountScreen section="rentals" /> };
/** "Account · Parental PIN" */
export const AccountParentalPin: Story = { parameters: figmaScreen("Account · Parental PIN | EN | desktop"), render: () => <AccountScreen section="parental-pin" /> };
/** "Account · Devices" */
export const AccountDevices: Story = { parameters: figmaScreen("Account · Devices | EN | desktop"), render: () => <AccountScreen section="devices" /> };
/** "Watchlist · empty" */
export const WatchlistEmpty: Story = { parameters: figmaScreen("Watchlist · empty | EN | desktop"), render: () => <WatchlistScreen /> };
/** "Watchlist" with saved titles. */
export const Watchlist: Story = { parameters: figmaScreen("Watchlist | EN | desktop"), render: () => <WatchlistScreen films={getCatalog("en").recommended} /> };
/** 404: production "The page could not be found". */
export const NotFound: Story = { render: () => <NotFoundScreen /> };
/** A route that failed: production "Something went wrong", link Home. */
export const RouteError: Story = { name: "Error", render: () => <ErrorScreen /> };
