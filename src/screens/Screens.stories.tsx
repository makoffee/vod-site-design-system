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

// Full key screens composed from the library, one story per design screen on "2 Key Screens". Storybook is English
// only: every screen renders its English default; the German app routes pass locale="de".
const meta = {
  title: "Screens/Key screens",
  // Compositions, not components: kept out of the component manifest (the rules page points agents at src/screens).
  tags: ["!manifest"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
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
export const Discover: Story = { render: () => <DiscoverScreen /> };
/** "channels | 1440" */
export const Channels: Story = { render: () => <ChannelsScreen /> };
/** "Genres | 1440px" */
export const Genres: Story = { render: () => <CategoriesScreen /> };
/** "single film view | 1440" */
export const Film: Story = { render: () => <FilmScreen /> };
/** "collection view | list | 1440" */
export const CollectionList: Story = { render: () => <CollectionScreen /> };
/** "collection view new | Grid | 1440" */
export const CollectionGrid: Story = { render: () => <CollectionScreen defaultView="grid" /> };
/** "collection view | list | expanded text | 1440" */
export const CollectionExpanded: Story = { render: () => <CollectionScreen defaultExpanded /> };
/** "search results | Static | 1440px": suggestions and feeds before a query. */
export const Search: Story = { render: () => <SearchScreen /> };
/** "search results | Sticky in-nav | 1440px" and "| 393px": results for a query. */
export const SearchResults: Story = { render: () => <SearchScreen defaultQuery="Drama" /> };
/** "No results for" + hint, production strings. */
export const SearchNoResults: Story = { render: () => <SearchScreen defaultQuery="Kubrik" results={[]} /> };
/** "login | 1440px" / "login | 393px" */
export const Login: Story = { render: () => <AuthScreen /> };
/** "signup with product card | 1440px" / "Signup | 393px" */
export const Signup: Story = { render: () => <AuthScreen defaultMode="signup" product="monthly" /> };

/** "Landing Page EN | 1440w" (4 Sooner DE Marketing Pages) */
export const Landing: Story = { render: () => <LandingScreen /> };

/** "onboarding EN | 1440" (4 Sooner DE Marketing Pages) */
export const Onboarding: Story = { render: () => <OnboardingScreen /> };

/** "Account · Profile" (production /en/account) */
export const AccountProfile: Story = { render: () => <AccountScreen section="profile" /> };
/** "Account · Settings" */
export const AccountSettings: Story = { render: () => <AccountScreen section="settings" /> };
/** "Account · Subscriptions" */
export const AccountSubscriptions: Story = { render: () => <AccountScreen section="subscriptions" /> };
/** "Account · Rentals" */
export const AccountRentals: Story = { render: () => <AccountScreen section="rentals" /> };
/** "Account · Parental PIN" */
export const AccountParentalPin: Story = { render: () => <AccountScreen section="parental-pin" /> };
/** "Account · Devices" */
export const AccountDevices: Story = { render: () => <AccountScreen section="devices" /> };
/** "Watchlist · empty" */
export const WatchlistEmpty: Story = { render: () => <WatchlistScreen /> };
/** "Watchlist" with saved titles. */
export const Watchlist: Story = { render: () => <WatchlistScreen films={getCatalog("en").recommended} /> };
/** 404: production "The page could not be found". */
export const NotFound: Story = { render: () => <NotFoundScreen /> };
/** A route that failed: production "Something went wrong", link Home. */
export const RouteError: Story = { name: "Error", render: () => <ErrorScreen /> };
